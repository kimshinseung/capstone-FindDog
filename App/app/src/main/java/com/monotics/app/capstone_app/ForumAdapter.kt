package com.monotics.app.capstone_app

import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.data.FindData
import com.monotics.app.capstone_app.data.ForumData
import kotlinx.android.synthetic.main.activity_forum.view.forum_enroll
import kotlinx.android.synthetic.main.finditem.view.FindImg
import kotlinx.android.synthetic.main.finditem.view.findaddress
import kotlinx.android.synthetic.main.finditem.view.findcolor
import kotlinx.android.synthetic.main.finditem.view.findcolor2
import kotlinx.android.synthetic.main.finditem.view.findfeature
import kotlinx.android.synthetic.main.finditem.view.findtuploadime
import kotlinx.android.synthetic.main.finditem.view.viewbutton2
import kotlinx.android.synthetic.main.forumitem.view.detail_forum
import kotlinx.android.synthetic.main.forumitem.view.forumcontent
import kotlinx.android.synthetic.main.forumitem.view.forumname
import kotlinx.android.synthetic.main.forumitem.view.forumowner
import kotlinx.android.synthetic.main.forumitem.view.forumtime
import kotlinx.android.synthetic.main.missitem.view.viewbutton
import java.text.SimpleDateFormat
import java.time.Instant

class ForumAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val db: FirebaseFirestore = Firebase.firestore
    private val forumData = db.collection("Forum")
    var ForumList: ArrayList<ForumData> = arrayListOf()

    class ListAdapter(val layout: View): RecyclerView.ViewHolder(layout)
    init {
        forumData.orderBy("uploadTime",
            Query.Direction.DESCENDING).addSnapshotListener { querySnapshot, firebaseFirestoreException ->
            ForumList.clear()

            for(snapshot in querySnapshot!!.documents){
                var item = snapshot.toObject(ForumData::class.java)
                ForumList.add(item!!)
            }
            notifyDataSetChanged()
        }
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        var view = LayoutInflater.from(parent.context).inflate(R.layout.forumitem,parent,false)
        return ViewHolder(view)
    }
    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view){}

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        var viewHolder = (holder as ViewHolder).itemView

        //null이나 ""값이면 익명으로 띄운다.
        if(ForumList[position].user==null || ForumList[position].user==""){
            viewHolder.forumowner.text = "익명"
        }else {
            viewHolder.forumowner.text = ForumList[position].user
        }
        val values = ForumList[position].content
        val text = values?.joinToString(", ")
        viewHolder.forumcontent.text = text
        //viewHolder.forumcontent.text = ForumList[position].content.toString()
        viewHolder.forumname.text = ForumList[position].title
        val timestamp = ForumList[position].uploadTime
        val date = timestamp?.toDate()
        // Date 값을 String으로 변환
        val formatter = SimpleDateFormat("yyyy-MM-dd HH:mm:ss") // 원하는 형식으로 포맷 지정
        val formattedDateTime = formatter.format(date)

        viewHolder.forumtime.text = formattedDateTime

        viewHolder.detail_forum.setOnClickListener {
            Log.e("kimshinseung", "success") // 검사

                val context = viewHolder.context
                val intent = Intent(context, DetailForumActivity::class.java)
                val forumenrollinf = hashMapOf(
                    "content" to ArrayList<String>(ForumList[position].content),
                    "title" to ForumList[position].title,
                    "uploadTime" to formattedDateTime,
                    "user" to ForumList[position].user
                )
                intent.putExtra("forumData", forumenrollinf)
                context.startActivity(intent)
        }

    }

    override fun getItemCount(): Int {
        return ForumList.size
    }
}