package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModelProvider
import com.google.firebase.auth.ktx.auth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.ktx.storage
import com.monotics.app.capstone_app.data.ProfileDataViewModel
import com.monotics.app.capstone_app.databinding.ActivityMainBinding
import com.monotics.app.capstone_app.databinding.ActivityProfileBinding
import kotlinx.android.synthetic.main.activity_profile.*
import net.daum.mf.map.api.MapView

class ProfileActivity : AppCompatActivity()  {
    val binding by lazy { ActivityProfileBinding.inflate(layoutInflater) }
    lateinit var profileDataViewModel: ProfileDataViewModel

    private val db: FirebaseFirestore = Firebase.firestore
    private val storage = Firebase.storage
    private val userdataCollectionRef = db.collection("Users")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        profileDataViewModel = ViewModelProvider(this).get(ProfileDataViewModel::class.java)
        profileDataViewModel.refreshData()


        //로그인되어있을때 실행하는 함수
        if(Firebase.auth.currentUser != null){
            profileDataViewModel.refreshData()
            profileDataViewModel.email.observeForever {
                binding.editEmail.text= Editable.Factory.getInstance().newEditable(it)
            }

            //임시로 이렇게 해놓음
            binding.loginButton.text="로그아웃"
            binding.textView4.text="회원정보"
            binding.textView7.visibility=View.INVISIBLE
            binding.createAccount.visibility= View.INVISIBLE
            binding.editEmail.isFocusableInTouchMode=false
            binding.editPassword.visibility=View.INVISIBLE
        }

        //로그인버튼
        binding.loginButton.setOnClickListener {
            if(binding.loginButton.text=="로그아웃"){
                val intent= Intent(this,MainActivity::class.java)
                Firebase.auth.signOut()
                Toast.makeText(applicationContext,"로그아웃되었습니다.",Toast.LENGTH_SHORT).show()
                startActivity(intent)
                finish()
            }
            else {
                doLogin(binding.editEmail.text.toString(), binding.editPassword.text.toString())
            }
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