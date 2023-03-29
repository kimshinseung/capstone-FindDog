package com.monotics.app.capstone_app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.monotics.app.capstone_app.databinding.ActivityHospitalBinding

class HospitalActivity: AppCompatActivity()  {
    val binding by lazy { ActivityHospitalBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

    }
}