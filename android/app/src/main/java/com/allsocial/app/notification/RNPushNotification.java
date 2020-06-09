package com.allsocial.app.notification;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNPushNotification extends ReactContextBaseJavaModule {

    public static Bundle notification = null;
    private boolean isAvailable = false;

    public RNPushNotification(ReactApplicationContext reactContext) {
        super(reactContext);
        if (RNPushNotification.notification != null) {
            notifyOpenedNotification();
        }

        IntentFilter filter = new IntentFilter(AppboyBroadcastReceiver.PUSH_OPENED);
        getReactApplicationContext().registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                RNPushNotification.notification = intent.getExtras();
                notifyOpenedNotification();
            }
        }, filter);
    }

    private void notifyOpenedNotification() {
        if (isAvailable && RNPushNotification.notification != null) {
            Log.d("PushTest", notification.toString());
            RNPushNotificationJsDelivery jsDelivery = new RNPushNotificationJsDelivery(getReactApplicationContext());
            jsDelivery.notifyOpenedNotification(notification);
            notification = null;
        }
    }

    @Override
    public String getName() {
        return "RNPushNotification";
    }

    @ReactMethod
    public void setAvailablePushNotification() {
        isAvailable = true;
        notifyOpenedNotification();
    }
}
