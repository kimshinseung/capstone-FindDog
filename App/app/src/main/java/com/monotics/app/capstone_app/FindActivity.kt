package com.monotics.app.capstone_app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.monotics.app.capstone_app.databinding.ActivityFindBinding

class FindActivity: AppCompatActivity()  {
    val binding by lazy { ActivityFindBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

    }
}