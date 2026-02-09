import { router, useLocalSearchParams } from 'expo-router';
import ConvertSettingsPage from '../../../src/components/convert-settings/convert-settings-page';
import { useMonitoredFolders } from '../../../src/hooks/use-monitored-folders';
import { Source } from '../../../src/models/source';
import { UploadSettings } from '../../../src/models/upload';
import { MangaConvertService } from '../../../src/services/manga-convert-service';

export default function index() {
  const { idx } = useLocalSearchParams();
  const updateFolderSettings = useMonitoredFolders((s) => s.updateFolderSettings);
  const deleteFolder = useMonitoredFolders((s) => s.deleteFolder);

  const sources: Source[] = [];
  let settings = UploadSettings.default('', '');
  const isMonitored = idx !== '-1';

  if (isMonitored) {
    const folder = useMonitoredFolders.getState().folders[Number(idx)];
    if (!folder) router.back();
    sources.push(folder.source);
    settings = folder.settings;
  }

  return (
    <ConvertSettingsPage
      isMonitored={isMonitored}
      initSources={sources}
      settings={settings}
      onProcess={(newSettings, newSources, isFilesMode) => {
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

        let paths: string[] = [];
        if (isFilesMode) {
          paths = newSources.map((e) => e.path);
        } else {
          paths = newSources[0].children!;
        }
        MangaConvertService.convert(paths, newSettings);
        //TODO: Go to queue page
      }}
    />
  );
}
