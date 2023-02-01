export interface BikeData {
  isConnected: true;
  os: 'ANDROID';
  product: 'PRODUCT_ZOOV03';
  project: [
    {
      boards_: [
        {
          hwRevId_: 23313;
          serialId_: 4000;
          type_: 5;
        },
        {
          hwRevId_: 27168;
          serialId_: 4823;
          type_: 2;
        },
      ];
      buildBugfix_: 23;
      buildMajor_: 8;
      buildMinor_: 18;
      type_: 3;
    },
    {
      boards_: [
        {
          hwRevId_: 11024;
          serialId_: 11174;
          type_: 3;
        },
      ];
      buildBugfix_: 3;
      buildMajor_: 3;
      buildMinor_: 0;
      type_: 8;
    },
  ];
  serialNumber: 113919;
  speed: 0;
  bikeStateExtended: {
    bikeState_: {
      lockState_: 1;
      maintenanceState_: 1;
      tripState_: 1;
    };
    error_: 0;
    lastChangeTimestamp_: 1674556127;
    lockTimeout_: 0;
    sentAtTimestamp_: 1674547352;
  };
  bikeStateMeta: {
    batteryCommunity_: {
      category_: 0;
      firmwareBugfix_: 0;
      firmwareMajor_: 0;
      firmwareMinor_: 0;
      hardwareRevision_: 0;
      manufacturerId_: 0;
      manufacturingDate_: 0;
      serialNumber_: 336074273;
      socSinceReboot_: false;
      stateOfChargeEstimated_: 98;
      stateOfChargeFromBattery_: 59;
      stateOfCharge_: 98;
      stateOfHealth_: 100;
      status_: 2;
    };
    bikeStateExtended_: {
      bikeState_: {
        lockState_: 1;
        maintenanceState_: 1;
        tripState_: 1;
      };
      error_: 0;
      lastChangeTimestamp_: 1674556127;
      lockTimeout_: 0;
      sentAtTimestamp_: 1674547352;
    };
    location_: {
      gpsTimestamp_: 0;
      latitude_: 0;
      longitude_: 0;
      stack_: {
        firstOfStack_: {
          category_: 3;
          serialNumber_: 0;
        };
        inStack_: 1;
        previousProduct_: {
          category_: 3;
          serialNumber_: 0;
        };
        rankInStack_: 1;
        rssi_: 0;
        stackId_: 0;
        stackNextBike_: 2;
      };
    };
  };
  firmwareVersion: {
    bugfix: 25;
    major: 3;
    minor: 16;
  };
}
