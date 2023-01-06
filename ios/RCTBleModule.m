#import "RCTBleModule.h"

@implementation RCTBleModule

// To export a module named RCTBleModule
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"RCTBleModule"];
}

RCT_EXPORT_METHOD(setUp:(nonnull NSString *)url
                  token:(nonnull NSString *)token
                  refreshToken:(nonnull NSString *)refreshToken)
{
  NSLog(@"RCTBleModule setUp");
  [RCTBleModuleSwift setUpWithUrl:url apiKey:nil token:token refreshToken:refreshToken];
}


@end
