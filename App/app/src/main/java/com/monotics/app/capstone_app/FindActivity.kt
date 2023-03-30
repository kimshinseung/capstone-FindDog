package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.monotics.app.capstone_app.databinding.ActivityFindBinding

class FindActivity: AppCompatActivity()  {
    val binding by lazy { ActivityFindBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        //프로필화면 돌아가기
        binding.profile.setOnClickListener{
            val intent = Intent(this,ProfileActivity::class.java)
            startActivity(intent)
        }

        //뒤로가기 버튼
        binding.backbtn.setOnClickListener{
            super.onBackPressed();
        }
        //로고화면 누르면 메인액티비티로
        binding.logo.setOnClickListener {
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }
    }
}