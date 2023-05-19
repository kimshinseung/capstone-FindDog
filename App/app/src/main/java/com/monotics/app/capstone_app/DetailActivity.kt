package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.monotics.app.capstone_app.databinding.ActivityDetailBinding
import com.monotics.app.capstone_app.databinding.ActivitySearchBinding

class DetailActivity: AppCompatActivity()  {
    val binding by lazy { ActivityDetailBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        val intent = intent
        val bundle = intent.getBundleExtra("missData")
        if (bundle != null) {
            binding.detailName.text= bundle.getString("name")
            binding.detailAddress.text=bundle.getString("address")
            binding.detailAge.text=bundle.getString("age")
            binding.detailDate.text=bundle.getString("date")
            binding.detailFarColor1.text=bundle.getString("farColor1")
            binding.detailFarColor2.text=bundle.getString("farColor2")
            binding.detailFeature.text=bundle.getString("feature")
            binding.detailKakaoId.text=bundle.getString("kakaoId")
            binding.detailGender.text=bundle.getString("gender")
            binding.detailNeutering.text=bundle.getString("neutering")
            binding.detailSpecify.text=bundle.getString("specify")
        }

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