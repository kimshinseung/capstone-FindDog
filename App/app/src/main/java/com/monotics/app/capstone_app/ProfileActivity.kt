package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.databinding.ActivityMainBinding
import com.monotics.app.capstone_app.databinding.ActivityProfileBinding
import kotlinx.android.synthetic.main.activity_profile.*
import net.daum.mf.map.api.MapView

class ProfileActivity : AppCompatActivity()  {
    val binding by lazy { ActivityProfileBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)


        //홈으로 돌아가기
        binding.HomeButton.setOnClickListener {
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }
        binding.createAccount.setOnClickListener {
            startActivity(Intent(this,SigninActivity::class.java))
        }
    }

}