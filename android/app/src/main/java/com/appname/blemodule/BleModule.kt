package com.appname.blemodule

import android.annotation.SuppressLint
import android.util.Log
import androidx.lifecycle.Observer
import com.facebook.react.bridge.*
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.GsonBuilder
import io.birota.zoovble.ZoovBLE
import io.birota.zoovble.model.bike.BikeData


class BleModule(val reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return TAG
    }

    private fun sendEvent(
        reactContext: ReactApplicationContext,
        eventName: String,
        params: WritableMap
    ) {
        reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
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



    @SuppressLint("LogNotTimber")
    @ReactMethod
    fun getBikeData(promise: Promise) {
        val bikeData = ZoovBLE.bikeData.value
        if (bikeData !== null){
            val json = GsonBuilder().create().toJson(bikeData)
            Log.d(TAG,json)
            promise.resolve(json)
        } else {
            promise.reject(Throwable("null"))
        }
    }

    private var observer : Observer<BikeData>? = null

    @ReactMethod
    fun addEventListener() {
        Log.d(TAG,"addEventListener")
        observer = Observer { bikeData ->
            if (reactContext != null && bikeData != null){
                val params = Arguments.createMap();
                params.putInt("os", bikeData.os?.number ?: 0)
                params.putInt("version_major", bikeData.firmwareVersion?.major ?: 0)
                params.putInt("version_minor", bikeData.firmwareVersion?.minor ?: 0)
                params.putInt("version_bugfix", bikeData.firmwareVersion?.bugfix ?: 0)
                params.putBoolean("connected", bikeData.isConnected)
                params.putInt("lockState", bikeData.bikeState?.lockStateValue ?: 0)
                params.putInt("product", bikeData.product?.number ?: 0)
                params.putInt("serial_number", bikeData.serialNumber)
                //val json = GsonBuilder().create().toJson(bikeData)
                //Log.d(TAG,"addEventListener + ${bikeData.bikeState?.lockStateValue}")
                sendEvent(reactContext, "BikeDataEvent",params);
            }
        }
        runOnUiThread{
            observer?.let {
                ZoovBLE.bikeData.observeForever(it)
            }
        }
    }

    @ReactMethod
    fun removeEventListener(promise: Promise) {
        Log.d(TAG,"removeEventListener")
        runOnUiThread {
            observer?.let {
                ZoovBLE.bikeData.removeObserver(observer!!)
            }
        }
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