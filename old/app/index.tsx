import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import StorageManager from '../modules/StorageManager';
import { useConversion } from '../src/hooks/useConversion';

export default function index() {
  useEffect(() => {
    requestPermissions().then(() => {
      useConversion.getState().init();
    });
  });
  return <Redirect href="/(tabs)/home" />;
}

async function requestPermissions() {
  const granted = await StorageManager.isExternalStorageManager();
  if (!granted) {
    await StorageManager.requestManageAllFiles();
  }
}
