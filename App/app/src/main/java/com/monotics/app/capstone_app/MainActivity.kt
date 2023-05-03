package com.monotics.app.capstone_app

import android.content.ContentValues.TAG
import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.pm.Signature
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Base64
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.PopupMenu
import android.widget.TextView
import android.widget.Toast
import androidx.core.view.GravityCompat
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.navigation.NavigationView
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.data.ProfileDataViewModel
import com.monotics.app.capstone_app.databinding.ActivityMainBinding
import com.monotics.app.capstone_app.databinding.NavheaderBinding
import kotlinx.android.synthetic.main.activity_main.recyclerHorizon
import net.daum.mf.map.api.MapView
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    private val binding2 by lazy { NavheaderBinding.inflate(layoutInflater)}
    lateinit var profileDataViewModel: ProfileDataViewModel
    private val db: FirebaseFirestore = Firebase.firestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

//        맵실현은 되는데 에뮬레이터에서는 안됨
//        val mapView = MapView(this)
//        val mapViewContainer = map_View
//        mapViewContainer.addView(mapView)

        var list = arrayListOf("Test 1", "Test 2", "Test 3", "Test 4")
        var manager02 = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        var adapter02 = FindboardAdapter(list)

        var RecyclerView02 = recyclerHorizon.apply {
            adapter = adapter02
            layoutManager = manager02
        }


        //메뉴 버튼 누르면 drawerlayout실행됨
        binding.menu.setOnClickListener{
            profileDataViewModel = ViewModelProvider(this).get(ProfileDataViewModel::class.java)
            profileDataViewModel.refreshData()

            profileDataViewModel.address.observeForever {
                val textView: TextView = findViewById(R.id.address)
                textView.text= it
            }
            profileDataViewModel.email.observeForever {
                val textView: TextView = findViewById(R.id.email)
                textView.text= it
            }
            profileDataViewModel.phoneNumber.observeForever {
                val textView: TextView = findViewById(R.id.phone)
                textView.text= it
            }

            binding.layoutDrawer.openDrawer(GravityCompat.START)
        }
        // 네비게이션 메뉴 아이템에 클릭 속성 부여
        binding.naviView.setNavigationItemSelectedListener(this)



        //프로필화면 돌아가기
        binding.profile.setOnClickListener{
            val intent = Intent(this,ProfileActivity::class.java)
            startActivity(intent)
        }

        //로고화면 누르면 메인액티비티로
        binding.logo.setOnClickListener {
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }
    }




    //네비게이션 메뉴 아이템 클릭시 수행
    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.miss -> startActivity(Intent(this,MissActivity::class.java))
            R.id.find -> startActivity(Intent(this,FindActivity::class.java))
            R.id.hospital-> startActivity(Intent(this,HospitalActivity::class.java))
            R.id.search-> startActivity(Intent(this,SearchActivity::class.java))
        }

        //close navigation view
        binding.layoutDrawer.closeDrawers()
        return false
    }
    //drawer가 열려 있을 때, 뒤로가기 버튼 누르면 drawer 먼저 닫아줌
    override fun onBackPressed() {
        if(binding.layoutDrawer.isDrawerOpen(GravityCompat.START)) {
            binding.layoutDrawer.closeDrawers()
        }else {
            super.onBackPressed()
        }
    }
}