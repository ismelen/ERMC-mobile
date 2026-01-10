import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { useConversion } from '../src/hooks/useConversion';

export default function index() {
  useEffect(() => {
    useConversion.getState().init();
  });
  return <Redirect href="/(tabs)/home" />;
}
