package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.ktx.auth
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

        //로그인되어있을때 실행하는 함수
        if(Firebase.auth.currentUser != null){
            //startActivity(Intent(this,SearchActivity::class.java))
        }

        //로그인버튼
        binding.loginButton.setOnClickListener {
            doLogin(binding.editEmail.text.toString(),binding.editPassword.text.toString())
        }

        //홈으로 돌아가기
        binding.HomeButton.setOnClickListener {
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }
        //회원가입 화면
        binding.createAccount.setOnClickListener {
            startActivity(Intent(this,SigninActivity::class.java))
        }
    }

    fun doLogin(id:String, pw: String){
        Firebase.auth.signInWithEmailAndPassword(id,pw)
            .addOnCompleteListener(this) {
                println("Login Task Occur")

                if(it.isSuccessful){
                    Toast.makeText(this, "로그인에 성공하였습니다.", Toast.LENGTH_SHORT).show()
                    finish()
                }
                else{
                    Log.w("LoginActivity", "signInWithEmail", it.exception)
                    Toast.makeText(this, "로그인에 실패하였습니다.", Toast.LENGTH_SHORT).show()
                }
            }
    }

}