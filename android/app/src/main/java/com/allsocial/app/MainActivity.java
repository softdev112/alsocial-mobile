package com.allsocial.app;

import android.app.Activity;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.Nullable;

import com.allsocial.app.notification.AppboyBroadcastReceiver;
import com.allsocial.app.notification.RNPushNotification;
import com.appboy.ui.inappmessage.AppboyInAppMessageManager;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import org.devio.rn.splashscreen.SplashScreen;

import io.branch.rnbranch.*;
import me.leolin.shortcutbadger.ShortcutBadger;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AllSocialMobile";
    }

//    @Override
//    protected ReactActivityDelegate createReactActivityDelegate() {
//        return new ReactActivityDelegate(this, getMainComponentName()) {
//            @Override
//            protected ReactRootView createRootView() {
//                return new RNGestureHandlerEnabledRootView(MainActivity.this);
//            }
//        };
//    }



    // Fixed at com.swmansion.gesturehandler.react.RNGestureHandlerModule.onCatalystInstanceDestroy(RNGestureHandlerModule.java:565)
    // https://www.microsoft.com/developerblog/2018/04/04/app-app-communication-react-native-android/ (Solution: Receiving the Intent on React Native Android)

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new InitialPropsReactActivityDelegate(this, getMainComponentName());
    }

    public static class InitialPropsReactActivityDelegate extends ReactActivityDelegate {
        private final @Nullable
        Activity mActivity;
        private @Nullable
        Bundle mInitialProps;

        public InitialPropsReactActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            mInitialProps = mActivity.getIntent().getExtras();
            super.onCreate(savedInstanceState);
        }

        @Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }
    }


    @Override
    protected void onResume() {
        super.onResume();
        ShortcutBadger.removeCount(this);

        AppboyInAppMessageManager.getInstance().registerInAppMessageManager(this);

        Bundle bundle = getIntent().getBundleExtra("push_notification");
        RNPushNotification.notification = bundle;
        if (bundle != null) {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent pushIntent = new Intent();
                    pushIntent.setAction(AppboyBroadcastReceiver.PUSH_OPENED);
                    pushIntent.putExtras(bundle);
                    sendBroadcast(pushIntent);
                    getIntent().removeExtra("push_notification");
                }
            }, 100);
        }
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.cancelAll();
    }

    @Override
    protected void onPause() {
        super.onPause();
        AppboyInAppMessageManager.getInstance().unregisterInAppMessageManager(this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this); // here
        super.onCreate(savedInstanceState);
    }

    // Override onStart, onNewIntent:
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        moveTaskToBack(true);
    }
}
