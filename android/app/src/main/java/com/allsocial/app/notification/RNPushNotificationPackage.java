package com.allsocial.app.notification;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class RNPushNotificationPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(
            @Nonnull ReactApplicationContext reactContext) {
        return Collections.<NativeModule>singletonList(new RNPushNotification(reactContext));
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
