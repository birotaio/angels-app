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
  
  private var callback : ((String?) -> Void)? = nil
  
  override init() {
    super.init()
    ZoovBLE.sharedInstance.delegate = self
  }
  
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
  
  @objc public func setCallBack(callback: @escaping(String?) -> Void){
    self.callback = callback
  }
  
  func bikeUpdated(bikeInfoWrapper: BikeInfoWrapper) {
    let encoder = JSONEncoder()
    var parametersArray: [[String: Any]] = [[:]]
    encoder.keyEncodingStrategy = .convertToSnakeCase // camel case comes from protobuf convention
    if let bikeInfo = bikeInfoWrapper.bikeInfo {
        do {
            let jsonData = try encoder.encode(bikeInfo)
            let decoded = try JSONSerialization.jsonObject(with: jsonData, options: [])
            if let dictFromJSON = decoded as? [String:Any] {
                parametersArray.append(dictFromJSON)
            }
        } catch let err {
            print("\(err)")
        }
    }
    parametersArray.append( ["connected" : bikeInfoWrapper.isConnected])
    if let lockStatus = bikeInfoWrapper.lockStatus {
      parametersArray.append( ["lockState" : lockStatus ? 1 : 2])
    }
    // Convert to json
    if(!parametersArray.isEmpty) {
        let parameters = parametersArray.reduce(into: [:]) { // merge array of dict into dict
            $0.merge($1) { (cur, _) in cur }
        }
        if let theJSONData = try? JSONSerialization.data(
            withJSONObject: parameters,
            options: []) {
            let theJSONText = String(data: theJSONData,
                                     encoding: .ascii)
            // Send info via Bridge Module
            callback!(theJSONText)
        } else {
            print("parametersArray err")
        }
    } else {
        print("parametersArray bike info is not ready")
    }
   
  }
  
  func bleStatusUpdated(bleState: CBManagerState) {
    // Not used
  }
  
  

}
