#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "AppName-Swift.h"
@interface RCTBleModule : RCTEventEmitter <RCTBridgeModule>
- (void) sendEvent;
@end
