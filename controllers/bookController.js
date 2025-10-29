const books = require("../model/bookModel");
//import stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
//console.log("Stripe key from env:", process.env.STRIPE_SECRET_KEY ? "✅ Loaded" : "❌ Missing");

//add book conroller
exports.addBookController = async(req,res)=>{

    console.log('inside add book controller');
    //console.log(req.body);
    //console.log(req.files);
    const { title,author,noOfPages, imageUrl,price, dprice,abstract,publisher,language,isbn,category} = req.body

     uploading = []
    
    req.files.map((item=>uploading.push(item.filename)))
    console.log(uploading);
    const email = req.payload;
    console.log(email);

    try{
        const existingBook = await books.findOne({title,userEmail:email})

        if(existingBook){
            res.status(401).json("you have already added this book!!")
        }else{
            const newBoook = new books({
                title,author,noOfPages,imageUrl,price, dprice,abstract,publisher,language,isbn,category,uploading,userEmail:email
            })
            await newBoook.save()
            res.status(200).json(newBoook)
        }

    }catch(err){
        res.status(500).json(err)
    }
    
    
    
    
    res.status(200).json('request recieved...')
    

}

//to get home books
exports.getHomeBookController = async(req,res)=>{
    try{
        const allHomeBooks = await books.find().sort({id:-1}).limit(4)
        res.status(200).json(allHomeBooks)

    }catch(err){
        res.status(500).json(err)
    }
}

//to get books in book page
exports.getAllBookController = async(req,res)=>{
    //console.log(req.query.search);
   const searchKey = req.query.search
   const email = req.payload
    
    try{
        const query = {
            title:{
                $regex:searchKey,$options:'i'
            },
             userEmail:{$ne:email}
        }
        const allBooks = await books.find(query)
        res.status(200).json(allBooks)

    }catch(err){
        res.status(500).json(err)
    }
}

//to get a particular book in view page
exports.getABookController = async(req,res)=>{
    
    const {id} = req.params
    console.log(id);
    

    try{
        const aBook = await books.findOne({_id:id})
        res.status(200).json(aBook)

    }catch(err){
        res.status(500).json(err)
    }
}

//to get all books added by user
exports.getAllUserBookController = async(req,res)=>{
 const email = req.payload
 console.log(email);
 try{
    const allUserBook = await books.find({userEmail:email})
    res.status(200).json(allUserBook)

 }catch(err){
    res.status(500).json(err)
 }
    
}

//to delete all books added by user
//console.log(req.params);

exports.deleteAllUserBookController = async (req, res) => {
  const { id } = req.params; // destructure id
  try {
    await books.findByIdAndDelete(id);
    res.status(200).json("Deleted successfully...");
  } catch (err) {
    res.status(500).json(err);
  }
};


//make payment 
exports.makePayment = async (req, res) => {
  try {
    const { bookDetails } = req.body;

    if (!bookDetails || !bookDetails.title || !bookDetails.dprice) {
      return res.status(400).json({ error: 'Invalid book details' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: bookDetails.title,
              description: bookDetails.abstract || 'Book purchase',
            },
            unit_amount: Math.round(bookDetails.dprice * 100),
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/payment-success',
      cancel_url: 'http://localhost:5173/payment-error',
      
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe payment error:', error);
    return res.status(500).json({ error: 'Payment session creation failed' });
  }
};






//to get all books brought by the user
exports.getAllUserBroughtBookController = async(req,res)=>{
 const email = req.payload
 console.log(email);
 try{
    const allUserBroughtBook = await books.find({brought: { $in: [email] }})
    res.status(200).json(allUserBroughtBook)

 }catch(err){
    res.status(500).json(err)
 }
    
}

//--------------admin---------------------------
exports.getAllBookAdminController = 
async(req,res)=>{
    
 try{
        const allBooks = await books.find()
        res.status(200).json(allBooks)

    }catch(err){
        res.status(500).json(err)
    }
}

//to approve book
exports.approveBookController = 
async(req,res)=>{

    const {_id,title,author,noOfPages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,uploading,status,userEmail,brought}=req.body

    console.log(_id,title,author,noOfPages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,uploading,status,userEmail,brought);
    
 
 try{
    const existingBook =await books.findByIdAndUpdate({_id},{_id,title,author,noOfPages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,uploading,status:'approved',userEmail,brought},{new:true})

    //await existingbook.save()
    res.status(200).json(existingBook)

      

    }catch(err){
        res.status(500).json(err)
    }
}




