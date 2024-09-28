import { Stack } from "expo-router";
import React from 'react';

const RootLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "MenuMate" }} />
    </Stack>
  );
};

export default RootLayout;