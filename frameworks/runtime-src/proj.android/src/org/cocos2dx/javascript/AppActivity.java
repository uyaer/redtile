/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 ****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.Toast;

import com.bmob.pay.tool.BmobPay;
import com.bmob.pay.tool.PayListener;
import com.kzpa.pai.Gkl;
import com.umeng.analytics.MobclickAgent;
import com.uyaer.myprincess.R;

// The name of .so is specified in AndroidMenifest.xml. NativityActivity will load it automatically for you.
// You can use "System.loadLibrary()" to load other .so files.

public class AppActivity extends Cocos2dxActivity {
	private static AppActivity app = null;

	private static String ADID = "e2b61b4043b55b694f25780ded32d7fa";
	// private static String ADID = "b3622572155d6ba3db047a6846030c21";

	static String hostIPAdress = "0.0.0.0";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);

		if (nativeIsLandScape()) {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
		} else {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
		}
		if (nativeIsDebug()) {
			getWindow().setFlags(
					WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
					WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		}
		hostIPAdress = getHostIpAddress();

		app = this;

		initAdSdk();

		BmobPay.init(app, "f3d5ed101dba9a63737e3a358ad05585");
	}

	private void initAdSdk() {
		Gkl pm = Gkl.getInstance(getApplicationContext(), ADID);
		pm.load();// 可预加载提前调用缓存广告至本地
	}

	@Override
	public void onPause() {
		super.onPause();
		MobclickAgent.onPause(this);
	}

	@Override
	public void onResume() {
		super.onResume();
		MobclickAgent.onResume(this);
	}

	@Override
	public Cocos2dxGLSurfaceView onCreateView() {
		Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
		// TestCpp should create stencil buffer
		glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

		return glSurfaceView;
	}

	public String getHostIpAddress() {
		WifiManager wifiMgr = (WifiManager) getSystemService(WIFI_SERVICE);
		WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
		int ip = wifiInfo.getIpAddress();
		return ((ip & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "."
				+ ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF));
	}

	public static String getLocalIpAddress() {
		return hostIPAdress;
	}

	private static native boolean nativeIsLandScape();

	private static native boolean nativeIsDebug();

	/******************************************************************************
	 * 提供给js调用的方法
	 ****************************************************************************** 
	 */

	/**
	 * 显示广告退出
	 */
	public static void showExitAd() {
		// 这里一定要使用runOnUiThread
		app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				// daoyoudao 360 ad
				Gkl pm = Gkl.getInstance(app.getApplicationContext(), ADID);
				pm.load();
				pm.exit(app);

			}
		});
	}

	/**
	 * 提示关闭界面
	 */
	public static void confirmClose() {
		// 这里一定要使用runOnUiThread
		app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				AlertDialog.Builder builder = new AlertDialog.Builder(app);
				builder.setMessage(app.getString(R.string.exit_tip));
				builder.setTitle(app.getString(R.string.alert));
				builder.setPositiveButton(app.getString(R.string.ok),
						new OnClickListener() {
							@Override
							public void onClick(DialogInterface arg0, int arg1) {
								// 一定要在GL线程中执行
								app.runOnGLThread(new Runnable() {
									@Override
									public void run() {
										Cocos2dxJavascriptJavaBridge
												.evalString("App.closeApp()");
									}
								});
							}
						});
				builder.setNegativeButton(app.getString(R.string.cancel),
						new OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								dialog.dismiss();
							}
						});
				builder.create().show();
			}
		});
	}

	/**
	 * 进入分享
	 */
	public static void showShare(final String url) {
		// 这里一定要使用runOnUiThread
		app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				Uri uri = Uri.parse(url);
				Intent it = new Intent(Intent.ACTION_VIEW, uri);
				app.startActivity(it);
			}
		});
	}

	/**
	 * 获取游戏包名称
	 */
	public static String getPackageURI() {
		return app.getPackageName();
	}

	/**
	 * 显示广告
	 */
	public static void showCpAd() {
		// 这里一定要使用runOnUiThread
		app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				Gkl pm = Gkl.getInstance(app.getApplicationContext(), ADID);
				pm.c();
				pm.show(app.getApplicationContext());
				pm.load();
			}
		});
	}

	/**
	 * 购买power
	 */
	public static void buyPower(final int type) {
		// 这里一定要使用runOnUiThread
		app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				PayListener payListenr = new PayListener() {
					@Override
					public void fail(final int arg0, String arg1) {
						app.runOnGLThread(new Runnable() {
							@Override
							public void run() {
								Cocos2dxJavascriptJavaBridge
										.evalString("App.buyPowerFail(" + arg0
												+ ")");
							}
						});
					}

					@Override
					public void orderId(String arg0) {
						System.out.println("order id:" + arg0);
					}

					@Override
					public void succeed() {
						Toast.makeText(app, "购买成功", Toast.LENGTH_LONG).show();
						app.runOnGLThread(new Runnable() {
							@Override
							public void run() {
								Cocos2dxJavascriptJavaBridge
										.evalString("App.buyPowerSuccess()");
							}
						});
					}

					@Override
					public void unknow() {
						System.out.println("unknow");
					}
				};

				if (type == 1) {
					new BmobPay(app).pay(1.0, "补满行动力", payListenr);
				} else {
					new BmobPay(app).payByWX(1.0, "补满行动力", payListenr);
				}
			}
		});
	}

}
