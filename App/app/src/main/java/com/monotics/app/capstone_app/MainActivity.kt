package com.monotics.app.capstone_app

import android.content.ContentValues.TAG
import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.pm.Signature
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Base64
import android.util.Log
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.databinding.ActivityMainBinding
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

class MainActivity : AppCompatActivity() {
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)



        binding.profile.setOnClickListener{
            val intent = Intent(this,ProfileActivity::class.java)
            startActivity(intent)
        }
        //데이터베이스 불러옴
        val db = Firebase.firestore
    }

}