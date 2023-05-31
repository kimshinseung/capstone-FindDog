package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.SearchView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.data.MissData
import com.monotics.app.capstone_app.databinding.ActivitySearchBinding
import kotlinx.android.synthetic.main.activity_miss.missrecycler
import kotlinx.android.synthetic.main.activity_search.searchrecycle
import kotlinx.android.synthetic.main.activity_search.spinner

class SearchActivity: AppCompatActivity()  {
    val binding by lazy { ActivitySearchBinding.inflate(layoutInflater) }
    private val db: FirebaseFirestore = Firebase.firestore
    private val missData = db.collection("Missing")
    var misslist: ArrayList<MissData> = arrayListOf()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        var searchOption = "품종"
        var list_search = arrayOf("specify","farColor1","address")
        binding.spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                searchOption = list_search[position].toString()
            }
        }
        var collectionname = "실종"
        var list_col = arrayOf("Missing","Finding")
        binding.spinner2.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                collectionname = list_col[position].toString()
            }
        }


        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener,
            androidx.appcompat.widget.SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {

                // 검색 버튼 누를 때 호출
                Log.d("kimshinseug","hi1")
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                // 검색창에서 글자가 변경이 일어날 때마다 호출
                Log.d("kimshinseug",newText.toString()) //검사용

                if(collectionname=="Missing"){
                var manager01 = LinearLayoutManager(applicationContext, LinearLayoutManager.VERTICAL, false)
                var adapter01 = SearchAdapter(newText.toString(),searchOption,collectionname)

                var RecyclerView02 = searchrecycle.apply {
                    adapter = adapter01
                    manager01.stackFromEnd
                    layoutManager = manager01
                }
                }else if(collectionname=="Finding"){
                    var manager01 = LinearLayoutManager(applicationContext, LinearLayoutManager.VERTICAL, false)
                    var adapter01 = SearchAdapterFind(newText.toString(),searchOption,collectionname)

                    var RecyclerView02 = searchrecycle.apply {
                        adapter = adapter01
                        manager01.stackFromEnd
                        layoutManager = manager01
                    }
                }


                return true
            }
        })


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
    // 파이어스토어에서 데이터를 불러와서 검색어가 있는지 판단

}
