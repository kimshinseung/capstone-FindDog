package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.databinding.ActivityDetailFindBinding
import com.monotics.app.capstone_app.databinding.ActivityDetailForumBinding
import com.monotics.app.capstone_app.databinding.ActivityDetailMissBinding
import kotlinx.android.synthetic.main.activity_detail_miss.detail_recycler

class DetailForumActivity: AppCompatActivity()  {
    val binding by lazy { ActivityDetailForumBinding.inflate(layoutInflater) }
    private lateinit var db: FirebaseFirestore
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        db = Firebase.firestore

        val inf = intent.getSerializableExtra("forumData") as HashMap<String,Any>
        binding.detailTitle.text = inf["title"] as? String
        binding.detailUploadtime.text = inf["uploadTime"] as? String
        Log.d("kimshinseung",inf["content"].toString())

        val values = inf["content"] as? ArrayList<String>
        val text = values?.joinToString(", ")
        binding.detailContent.text = text
        if(inf["user"]==null || inf["user"]==""){
            binding.detailUser.text = "익명"
        }else{
            binding.detailUser.text = inf["user"] as? String
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