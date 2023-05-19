package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.data.MissData
import kotlinx.android.synthetic.main.missboard.view.boardimg
import kotlinx.android.synthetic.main.missboard.view.textImg

class MissboardAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val db: FirebaseFirestore = Firebase.firestore
    private val missData = db.collection("Missing")
    var misslist: ArrayList<MissData> = arrayListOf()

    class ListAdapter(val layout: View): RecyclerView.ViewHolder(layout)
    init {
        missData.orderBy("uploadTime",Query.Direction.DESCENDING).addSnapshotListener { querySnapshot, firebaseFirestoreException ->
            misslist.clear()

            for(snapshot in querySnapshot!!.documents){
                var item = snapshot.toObject(MissData::class.java)
                misslist.add(item!!)
            }
            notifyDataSetChanged()
        }
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        var view = LayoutInflater.from(parent.context).inflate(R.layout.missboard,parent,false)
        return ViewHolder(view)
    }
    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view){}

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        var viewHolder = (holder as ViewHolder).itemView


        if(misslist[position].img!=null){ //이미지가 한 장일때
            Glide.with(viewHolder.boardimg)
                .load(misslist[position].img)
                .into(viewHolder.boardimg)

        }else if(misslist[position].imgs!=null){ //이미지가 여러 장일 때 첫 장만 보여줌
            Glide.with(viewHolder.boardimg)
                .load(misslist[position].imgs?.get(0))
                .into(viewHolder.boardimg)

        }

        viewHolder.textImg.text = misslist[position].address//주소



        viewHolder.boardimg.setOnClickListener {
            Log.e("kimshinseung","success") // 검사

            val context = viewHolder.context
            val intent = Intent(context,DetailActivity::class.java)
            val bundle= Bundle()
            bundle.putString("name", misslist[position].name)
            bundle.putString("address", misslist[position].address)
            bundle.putString("age", misslist[position].age)
            bundle.putString("date", misslist[position].date)
            bundle.putString("farColor1", misslist[position].farColor1)
            bundle.putString("farColor2", misslist[position].farColor2)
            bundle.putString("feature", misslist[position].feature)
            bundle.putString("kakaoId", misslist[position].kakaoId)
            bundle.putString("gender", misslist[position].gender)
            bundle.putString("neutering", misslist[position].neutering)
            bundle.putString("specify", misslist[position].specify)
            intent.putExtra("missData",bundle)
            context.startActivity(intent)
        }

    }

    override fun getItemCount(): Int {
        return misslist.size
    }
}