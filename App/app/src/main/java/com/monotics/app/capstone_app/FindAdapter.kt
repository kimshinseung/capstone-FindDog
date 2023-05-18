package com.monotics.app.capstone_app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.data.FindData
import com.monotics.app.capstone_app.data.MissData
import kotlinx.android.synthetic.main.finditem.view.FindImg
import kotlinx.android.synthetic.main.finditem.view.findaddress
import kotlinx.android.synthetic.main.finditem.view.findcolor
import kotlinx.android.synthetic.main.missitem.view.missaddress
import kotlinx.android.synthetic.main.missitem.view.missimg
import kotlinx.android.synthetic.main.missitem.view.missname

class FindAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val db: FirebaseFirestore = Firebase.firestore
    private val findData = db.collection("Finding").orderBy("uploadTime")
    var findlist: ArrayList<FindData> = arrayListOf()

    class ListAdapter(val layout: View): RecyclerView.ViewHolder(layout)
    init {
        findData.orderBy("uploadTime",
            Query.Direction.DESCENDING).addSnapshotListener { querySnapshot, firebaseFirestoreException ->
            findlist.clear()

            for(snapshot in querySnapshot!!.documents){
                var item = snapshot.toObject(FindData::class.java)
                findlist.add(item!!)
            }
            notifyDataSetChanged()
        }
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        var view = LayoutInflater.from(parent.context).inflate(R.layout.finditem,parent,false)
        return ViewHolder(view)
    }
    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view){}

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        var viewHolder = (holder as ViewHolder).itemView


        if(findlist[position].img!=null){ //이미지가 한 장일때
            Glide.with(viewHolder.FindImg)
                .load(findlist[position].img)
                .into(viewHolder.FindImg)

        }else if(findlist[position].imgs!=null){ //이미지가 여러 장일 때 첫 장만 보여줌
            Glide.with(viewHolder.FindImg)
                .load(findlist[position].imgs?.get(0))
                .into(viewHolder.FindImg)

        }
        viewHolder.findcolor.text = findlist[position].farColor
        viewHolder.findaddress.text = findlist[position].address//주소

    }

    override fun getItemCount(): Int {
        return findlist.size
    }
}