//
//  RCTBleModuleSwift.swift
//  AppName
//
//  Created by Sylvain Levy on 05/01/2023.
//

import Foundation
import ZoovBLEiOS

@objc class RCTBleModuleSwift : NSObject {
 
  @objc public static func setUp(url: String, apiKey: String?, token: String?, refreshToken: String? = nil) {
      ZoovBLE.sharedInstance.setUp(url: url, apiKey: apiKey, token: token,refreshToken: refreshToken)
  }
}
