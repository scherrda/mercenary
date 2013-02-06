package com.zebia;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class LoginActivity extends Activity implements View.OnClickListener {

    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

////        Button btnItems = (Button) findViewById(R.id.btn_start_items_activity);
////        Button btnSongs = (Button) findViewById(R.id.btn_start_songs_activity);
//
//        btnItems.setOnClickListener(this);
//        btnSongs.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        Intent launchActivityIntent = null;

        switch (v.getId()) {
//            case R.id.btn_start_items_activity:
//                launchActivityIntent = new Intent().setClass(this, ItemActivity.class);
//                break;
//            case R.id.btn_start_songs_activity:
//                launchActivityIntent = new Intent().setClass(this, SongActivity.class);
//                break;
        }

        if (launchActivityIntent != null) {
            startActivity(launchActivityIntent);
        }
    }
}
