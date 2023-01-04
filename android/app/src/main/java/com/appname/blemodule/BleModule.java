package com.appname.blemodule;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.birota.zoovble.ZoovBLE;
import timber.log.Timber;

public class BleModule extends ReactContextBaseJavaModule {
  private static final String TAG = "BleModule";

  public BleModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return TAG;
  }

  @ReactMethod
  public void setUp(String url,String token,String refreshToken){
    Timber.tag(TAG).d("setUp");
    ZoovBLE.INSTANCE.setUp(url,null,token,refreshToken,false,false);
  }
}