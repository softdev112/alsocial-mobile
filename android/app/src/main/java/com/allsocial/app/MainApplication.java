package com.allsocial.app;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LifecycleObserver;
import androidx.multidex.MultiDex;

import com.allsocial.app.notification.RNPushNotificationPackage;
import com.appboy.Appboy;
import com.appboy.AppboyLifecycleCallbackListener;
import com.appboy.support.AppboyLogger;
import com.appboy.ui.inappmessage.AppboyInAppMessageManager;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.google.firebase.FirebaseApp;
import com.microsoft.codepush.react.CodePush;

import java.util.List;

import io.branch.rnbranch.RNBranchModule;

public class MainApplication extends Application implements ReactApplication, LifecycleObserver {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new RNPushNotificationPackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Fresco.initialize(this);

        RNBranchModule.getAutoInstance(this);
        SoLoader.init(this, /* native exopackage */ false);

        FirebaseApp.initializeApp(this);

        Appboy.enableSdk(this);

        registerActivityLifecycleCallbacks(new AppboyLifecycleCallbackListener(true, true));
        AppboyLogger.setLogLevel(Log.VERBOSE);

        AppboyInAppMessageManager.getInstance().ensureSubscribedToInAppMessageEvents(this);

        initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    }

    /**
     * Loads Flipper in React Native templates.
     *
     * @param context
     */
    private static void initializeFlipper(Context context) {
        if (BuildConfig.DEBUG) {
            try {
                /*
                We use reflection here to pick up the class that initializes Flipper,
                since Flipper library is not available in release mode
                */
                Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
