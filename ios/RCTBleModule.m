#import "RCTBleModule.h"
#import <React/RCTConvert.h>

@implementation RCTBleModule
{
  bool hasListeners;
  RCTBleModuleSwift *moduleSwift;
}



- (NSArray<NSString *> *)supportedEvents {
  moduleSwift = [[RCTBleModuleSwift alloc] init];
  __weak typeof(self) weakSelf = self;
  [moduleSwift setCallBackWithCallback:^(NSString * _Nullable infos) {
    [weakSelf sendEventWithName:@"BikeDataEvent" body:infos];
  }];
  return @[@"BikeDataEvent"];
}

- (void)startObserving{
  hasListeners = YES;
}

- (void)stopObserving {
  hasListeners = NO;
}

RCT_EXPORT_METHOD(setUp:(nonnull NSString *)url
                  token:(nonnull NSString *)token
                  refreshToken:(nonnull NSString *)refreshToken)
{
  [RCTBleModuleSwift setUpWithUrl:url token:token refreshToken:refreshToken];
}

RCT_EXPORT_METHOD(connect:(NSInteger)bikeId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [RCTBleModuleSwift connectWithBikeId:bikeId onSuccess:^{
    resolve(@"12012");
  } onFailure:^(NSError * _Nonnull error) {
    reject(@"BLEModule",@"connectWithBikeId",error);
  }];
}

RCT_EXPORT_METHOD(disconnect)
{
  [RCTBleModuleSwift disconnect];
}

RCT_EXPORT_METHOD(lockBike:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [RCTBleModuleSwift lockBikeOnSuccess:^{
    resolve(@"12012");
  } onFailure:^(NSError * _Nonnull error) {
    reject(@"BLEModule",@"lockBike",error);
  }];
}

RCT_EXPORT_METHOD(unlockBike:(NSInteger)timeOutToLock
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [RCTBleModuleSwift unlockBikeWithTimeOutToLock:timeOutToLock onSuccess:^{
    resolve(@"12012");
  } onFailure:^(NSError * _Nonnull error) {
    reject(@"BLEModule",@"unlockBike",error);
  }];
}

RCT_EXPORT_METHOD(unlockBattery:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [RCTBleModuleSwift unlockBatteryOnSuccess:^{
    resolve(@"12012");
  } onFailure:^(NSError * _Nonnull error) {
    reject(@"BLEModule",@"unlockBattery",error);
  }];
}

RCT_EXPORT_MODULE();// To export a module named RCTBleModule
@end
