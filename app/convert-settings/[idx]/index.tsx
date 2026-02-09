import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import ConvertLoading from '../../../src/components/convert-settings/convert-loading';
import ConvertSettingsPage from '../../../src/components/convert-settings/convert-settings-page';
import { useMonitoredFolders } from '../../../src/hooks/use-monitored-folders';
import { Source } from '../../../src/models/source';
import { UploadSettings } from '../../../src/models/upload';
import { MangaConvertService } from '../../../src/services/manga-convert-service';

export default function index() {
  const { idx } = useLocalSearchParams();
  const updateFolderSettings = useMonitoredFolders((s) => s.updateFolderSettings);
  const deleteFolder = useMonitoredFolders((s) => s.deleteFolder);
  const [loading, setLoading] = useState(false);

  let sources: Source[] = [];
  let settings = UploadSettings.default('', '');
  const isMonitored = idx !== '-1';

  if (isMonitored) {
    const folder = useMonitoredFolders.getState().folders[Number(idx)];
    if (!folder) router.back();
    sources.push(folder.source);
    settings = folder.settings;
  }

  return <ConvertLoading />;
  // if (loading) return <ConvertLoading />;

  return (
    <ConvertSettingsPage
      isMonitored={isMonitored}
      initSources={sources}
      settings={settings}
      onProcess={async (newSettings, newSources, isFilesMode) => {
        if (isMonitored) {
          if (newSources.length === 0) {
            deleteFolder(Number(idx));
            router.back();
            return;
          }
          updateFolderSettings(newSettings, Number(idx));
        }

        if (newSources.length === 0) {
          alert('Nothing to upload!!');
          return;
        }

        sources = newSources;
        settings = newSettings;

        let paths: string[] = [];
        if (isFilesMode) {
          paths = newSources.map((e) => e.path);
        } else {
          paths = newSources[0].children!;
        }

        setLoading(true);
        const queue = await MangaConvertService.convert(paths, newSettings);
        setLoading(false);

        if (!queue) return;

        queue.sources = sources;

        router.replace('/(tabs)/queue');
      }}
    />
  );
}
