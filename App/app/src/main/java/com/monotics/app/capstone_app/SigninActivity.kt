package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.monotics.app.capstone_app.databinding.ActivitySigninBinding

class SigninActivity: AppCompatActivity() {
    val binding by lazy { ActivitySigninBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

    }
}