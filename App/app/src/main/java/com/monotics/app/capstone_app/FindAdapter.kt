package com.monotics.app.capstone_app

import android.content.Intent
import android.util.Log
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
import kotlinx.android.synthetic.main.finditem.view.findcolor2
import kotlinx.android.synthetic.main.finditem.view.findfeature
import kotlinx.android.synthetic.main.finditem.view.findtuploadime
import kotlinx.android.synthetic.main.finditem.view.viewbutton
import kotlinx.android.synthetic.main.missitem.view.missaddress
import kotlinx.android.synthetic.main.missitem.view.missimg
import kotlinx.android.synthetic.main.missitem.view.missname

class FindAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val db: FirebaseFirestore = Firebase.firestore
    private val findData = db.collection("Finding")
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
        viewHolder.findcolor.text = findlist[position].farColor1
        viewHolder.findaddress.text = findlist[position].address//주소
        viewHolder.findcolor2.text = findlist[position].farColor2
        viewHolder.findfeature.text = findlist[position].feature
        viewHolder.findtuploadime.text = findlist[position].date

        viewHolder.viewbutton.setOnClickListener {
            Log.e("kimshinseung", "success") // 검사
            if (findlist[position].visibled == true) { //visible필드가 true이면 상세 게시물로 이동한다.
                val context = viewHolder.context
                val intent = Intent(context, DetailfindActivity::class.java)
                val findenrollinf = hashMapOf(
                    "address" to findlist[position].address,
                    "age" to findlist[position].age,
                    "date" to findlist[position].date,
                    "farColor1" to findlist[position].farColor1,
                    "farColor2" to findlist[position].farColor2,
                    "feature" to findlist[position].feature,
                    "kakaoId" to findlist[position].kakaoId,
                    "gender" to findlist[position].gender,
                    "specify" to findlist[position].specify,
                    "uid" to findlist[position].uid,
                    "id" to findlist[position].id,
                    "imgs" to ArrayList<String>(findlist[position].imgs)
                )
                intent.putExtra("findData", findenrollinf)
                context.startActivity(intent)
            }else {}
        }


    }

    override fun getItemCount(): Int {
        return findlist.size
    }
}