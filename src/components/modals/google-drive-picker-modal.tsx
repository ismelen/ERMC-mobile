import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { create } from 'zustand';

interface State {
  token?: string;
  resolver?: (value?: { id: string; name: string }) => void;
  close(folderId: string, folderName: string): void;
  show(token: string): Promise<{ id: string; name: string } | undefined>;
}

export const useGoogleDrivePicker = create<State>((set, get) => ({
  show(token: string): Promise<{ id: string; name: string } | undefined> {
    return new Promise<{ id: string; name: string } | undefined>((resolve) => {
      set({ token: token, resolver: resolve });
    });
  },

  close(folderId: string, folderName: string) {
    const { resolver } = get();
    set({ token: undefined, resolver: undefined });

    if (!folderId || !folderName) {
      resolver?.(undefined);
      return;
    }

    resolver?.({ id: folderId, name: folderName });
  },
}));

export default function DriveFolderPickerModalRoot() {
  const token = useGoogleDrivePicker((s) => s.token);
  const close = useGoogleDrivePicker((s) => s.close);

  if (!token) return null;

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecciona una carpeta</Text>
        <TouchableOpacity onPress={() => close('', '')}>
          <Text style={{ color: 'red' }}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <DriveFolderList token={token} onSelect={(id, name) => close(id, name)} />
    </View>
  );
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export interface GoogleDriveResponse {
  files: GoogleDriveFile[];
  nextPageToken?: string;
}
interface Props {
  token: string;
  onSelect: (folderId: string, folderName: string) => void;
}

function DriveFolderList({ token, onSelect }: Props) {
  const [folders, setFolders] = useState<GoogleDriveFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      // Filtramos por carpetas que no estén en la papelera
      const query = encodeURIComponent(
        "mimeType='application/vnd.google-apps.folder' and trashed=false and 'me' in owners"
      );

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType)&orderBy=name`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Error al conectar con Google Drive');

      const data: GoogleDriveResponse = await response.json();
      setFolders(data.files);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Cargando carpetas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchFolders} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={folders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.folderItem} onPress={() => onSelect(item.id, item.name)}>
          <Text style={styles.folderIcon}>📁</Text>
          <Text style={styles.folderName} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No se encontraron carpetas en tu unidad.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  listContent: { paddingBottom: 20 },
  loadingText: { marginTop: 10, color: '#666' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
  retryButton: { padding: 10, backgroundColor: '#4285F4', borderRadius: 5 },
  retryText: { color: 'white', fontWeight: 'bold' },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  folderIcon: { fontSize: 24, marginRight: 15 },
  folderName: { fontSize: 16, color: '#333', flex: 1 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' },
});
