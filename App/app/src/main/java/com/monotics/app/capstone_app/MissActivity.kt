package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.monotics.app.capstone_app.databinding.ActivityMissBinding
import kotlinx.android.synthetic.main.activity_miss.missrecycler

class MissActivity: AppCompatActivity()  {
    val binding by lazy { ActivityMissBinding.inflate(layoutInflater) }
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
        //실종등록하기 버튼
        binding.missEnroll.setOnClickListener {
            //로그인되어있어야 게시물 등록할 수 있다.
            if(FirebaseAuth.getInstance().uid != null){
            val intent = Intent(this,MissEnrollActivity::class.java)
            startActivity(intent)
            }
            else{
                Toast.makeText(this,"게시물 등록권한이 없습니다, 로그인 해주세요", Toast.LENGTH_LONG).show()
            }
        }

        //실종게시물 부분
        var manager01 = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        var adapter01 = MissAdapter()

        var RecyclerView02 = missrecycler.apply {
            adapter = adapter01
            layoutManager = manager01
        }

    }
}