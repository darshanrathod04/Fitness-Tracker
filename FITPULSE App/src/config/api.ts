// Central API configuration.
//
// baseURL is the backend host reachable from your device/emulator:
//  - Android emulator: use 10.0.2.2 to reach the host machine
//  - Physical device:  use your computer's LAN IP (e.g. http://192.168.1.10:8080)
//  - iOS simulator:    http://localhost:8080
// Override without editing code via the EXPO_PUBLIC_API_URL env var.

const DEFAULT_API_URL = 'http:///10.164.252.38:8080/api';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || DEFAULT_API_URL;

export const API_TIMEOUT_MS = 15000;