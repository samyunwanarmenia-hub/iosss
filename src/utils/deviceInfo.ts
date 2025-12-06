"use client";

import { UAParser } from 'ua-parser-js';

export interface DeviceInfo {
  deviceVendor: string | null;
  deviceModel: string | null;
  cpuArchitecture: string | null;
  clientTimezone: string;
}

export const getDeviceInfo = (): DeviceInfo => {
  const uaParser = new UAParser();
  const uaResult = uaParser.getResult();

  const deviceVendor = uaResult.device.vendor || null;
  const deviceModel = uaResult.device.model || null;
  const cpuArchitecture = uaResult.cpu.architecture || null;
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    deviceVendor,
    deviceModel,
    cpuArchitecture,
    clientTimezone,
  };
};