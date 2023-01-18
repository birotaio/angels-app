package com.appname.blemodule

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import io.birota.zoovble.ZoovBLE
import io.birota.zoovble.model.bike.BikeData

class BleModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return TAG
    }

    @ReactMethod
    fun setUp(url: String, token: String, refreshToken: String?) {

        ZoovBLE.setUp(url =url, apiKey = null,token= token,refreshToken= refreshToken,enableBikeLogs = true, enableRawDataLogs = true)
    }

    @ReactMethod
    fun connect(bikeId: Int,promise: Promise) {
        runOnUiThread {
            ZoovBLE.connect(bikeId, onSuccess = {
                promise.resolve(EVENT_ID);
            }, onError = {
                promise.reject(it)
            })
        }
    }

    @ReactMethod
    fun getBikeData(): BikeData? {
        return ZoovBLE.bikeData.value
    }

    @ReactMethod
    fun disconnect() {
        runOnUiThread {
            ZoovBLE.disconnect()
        }
    }

    @ReactMethod
    fun lockBike(promise: Promise) {
        runOnUiThread {
            ZoovBLE.lockBike(onSuccess = {
                promise.resolve(EVENT_ID);
            }, onError = {
                promise.reject(it)
            })
        }
    }

    @ReactMethod
    fun unlockBike(lockTimeout: Int,promise: Promise) {
        runOnUiThread {
            ZoovBLE.unlockBike(lockTimeout, onSuccess = {
                promise.resolve(EVENT_ID);
            }, onError = {
                promise.reject(it)
            })
        }
    }
    @ReactMethod
    fun unlockBattery(promise: Promise) {
        runOnUiThread {
            ZoovBLE.unlockBattery( onSuccess = {
                promise.resolve(EVENT_ID);
            }, onError = {
                promise.reject(it)
            })
        }
    }


    companion object {
        private const val TAG = "BleModule"
        private const val EVENT_ID = 12012
    }
}