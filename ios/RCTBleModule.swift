//
//  RCTBleModuleSwift.swift
//  AppName
//
//  Created by Sylvain Levy on 05/01/2023.
//
import Foundation
import ZoovBLEiOS
import CoreBluetooth

@objc class RCTBleModuleSwift : NSObject,ZoovBLEDelegate {
 
  private static let TAG = "BleModule"
  
  @objc public static func setUp(url: String, token: String?, refreshToken: String? = nil) {
    ZoovBLE.sharedInstance.setUp(url: url, apiKey: nil, token: token,refreshToken: refreshToken)
  }
  @objc public static func connect(bikeId: NSInteger,onSuccess: @escaping() -> Void, onFailure: @escaping(Error) -> Void) {
    ZoovBLE.sharedInstance.connect(bikeId: UInt32(bikeId), onSuccess: onSuccess, onFailure: onFailure)
  }
  
  @objc public static func disconnect() {
    ZoovBLE.sharedInstance.disconnect()
  }

  @objc public static func lockBike(onSuccess: @escaping() -> Void, onFailure: @escaping(Error) -> Void) {
    ZoovBLE.sharedInstance.lock(onSuccess: onSuccess, onFailure: onFailure)
  }

  @objc public static func unlockBike(timeOutToLock : NSInteger,onSuccess: @escaping() -> Void, onFailure: @escaping(Error) -> Void) {
    ZoovBLE.sharedInstance.unlock(timeOutToLock: UInt32(timeOutToLock),onSuccess: onSuccess, onFailure: onFailure)
  }

  @objc public static func unlockBattery(onSuccess: @escaping() -> Void, onFailure: @escaping(Error) -> Void) {
    ZoovBLE.sharedInstance.unlockBattery(onSuccess: onSuccess, onFailure: onFailure)
  }
  
  @objc public func imhere(mess : String){
    print ("imhere",mess);
  }
  
  func bikeUpdated(bikeInfoWrapper: BikeInfoWrapper) {
    // Send info via Bridge Module
    print ("bikeUpdated");
  }
  
  func bleStatusUpdated(bleState: CBManagerState) {
    // Not used
    print ("bleStatusUpdated");
  }
  

}
