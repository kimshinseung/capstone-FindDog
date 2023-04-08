package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.databinding.ActivityMissenrollBinding

class MissEnrollActivity: AppCompatActivity() {
    val db:FirebaseFirestore = Firebase.firestore
    private val MissingCollectionRef = db.collection("Missing")
    val binding by lazy { ActivityMissenrollBinding.inflate(layoutInflater) }
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

        //사진업로드 버튼
        binding.uploadImg.setOnClickListener {
            //권한 있는 지 확인 먼저
            val readPermission = ActivityCompat.checkSelfPermission(
                this,
                android.Manifest.permission.READ_EXTERNAL_STORAGE
            )

            val intent = Intent(Intent.ACTION_PICK)
            intent.type = MediaStore.Images.Media.CONTENT_TYPE
            //startActivityForResult(intent, 1)
        }
        //등록하기 버튼
        binding.enroll.setOnClickListener {
            val address = binding.addressEdit.text.toString()
            val farcolor = binding.farcolorEdit.text.toString()
            val feature = binding.personalityEdit.text.toString()
            val gender = binding.genderEdit.text.toString()
            val specify = binding.specifyEdit.text.toString()
            val name = binding.nameEdit.text.toString()
            val enrollinf= hashMapOf(
                "address" to address,
                "farColor" to farcolor,
                "feature" to feature,
                "gender" to gender,
                "specify" to specify,
                "name" to name
            )
            MissingCollectionRef.document().set(enrollinf).addOnFailureListener{
                Toast.makeText(this,"실종 등록에 실패하였습니다.", Toast.LENGTH_SHORT).show()
            }
            super.onBackPressed()
        }

    }

}