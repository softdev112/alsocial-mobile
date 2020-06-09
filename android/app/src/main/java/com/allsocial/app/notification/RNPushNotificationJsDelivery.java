package com.allsocial.app.notification;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Set;

public class RNPushNotificationJsDelivery {
    private ReactApplicationContext mReactContext;

    RNPushNotificationJsDelivery(ReactApplicationContext reactContext) {
        mReactContext = reactContext;
    }

    private void sendEvent(String eventName, Object params) {
        if (mReactContext.hasActiveCatalystInstance()) {
            mReactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

    void notifyRemoteFetch(Bundle bundle) {
        String bundleString = convertJSON(bundle);
        WritableMap params = Arguments.createMap();
        params.putString("dataJSON", bundleString);
        sendEvent("remoteFetch", params);
    }

    void notifyRegisteredDeviceToken(String token) {
        WritableMap params = Arguments.createMap();
        params.putString("deviceToken", token);

        sendEvent("remoteNotificationDeviceToken", params);
    }

    void notifyReceivedNotification(Bundle bundle) {
        String bundleString = convertJSON(bundle);

        WritableMap params = Arguments.createMap();
        params.putString("dataJSON", bundleString);
        sendEvent("remoteNotificationReceived", params);
    }

    public void notifyOpenedNotification(Bundle bundle) {
        String bundleString = convertJSON(bundle);

        WritableMap params = Arguments.createMap();
        params.putString("dataJSON", bundleString);

        sendEvent("notificationActionOpened", params);

        Log.d("Push Test", bundleString);
    }

    void notifyNotificationAction(Bundle bundle) {
        String bundleString = convertJSON(bundle);

        WritableMap params = Arguments.createMap();
        params.putString("dataJSON", bundleString);

        sendEvent("notificationActionReceived", params);
    }

    private String convertJSON(Bundle bundle) {
        try {
            JSONObject json = convertJSONObject(bundle);
            return json.toString();
        } catch (JSONException e) {
            return null;
        }
    }

    // a Bundle is not a map, so we have to convert it explicitly
    private JSONObject convertJSONObject(Bundle bundle) throws JSONException {
        JSONObject json = new JSONObject();
        Set<String> keys = bundle.keySet();
        for (String key : keys) {
            Object value = bundle.get(key);
            if (value instanceof Bundle) {
                json.put(key, convertJSONObject((Bundle) value));
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                json.put(key, JSONObject.wrap(value));
            } else {
                json.put(key, value);
            }
        }
        return json;
    }



}
