package com.monotics.app.capstone_app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.data.MissData
import kotlinx.android.synthetic.main.missboard.view.textImg

class FindboardAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    //var list = arrayListOf("Test 1", "Test 2", "Test 3", "Test 4")
    private val db: FirebaseFirestore = Firebase.firestore
    private val missData = db.collection("Missing")
    var misslist: ArrayList<MissData> = arrayListOf()

    class ListAdapter(val layout: View): RecyclerView.ViewHolder(layout)
    init {
        missData.addSnapshotListener { querySnapshot, firebaseFirestoreException ->
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

        viewHolder.textImg.text = misslist[position].address

    }

    override fun getItemCount(): Int {
        return misslist.size
    }
}