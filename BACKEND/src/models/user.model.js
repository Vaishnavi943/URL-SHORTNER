import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: false
    }
});

userSchema.methods.comparePassword =  async function(password) {
    return  await bcrypt.compare(password, this.password);
}

userSchema.set('toJSON', {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate Gravatar URL based on email
userSchema.pre('save', function(next) {
    if (!this.avatar) {
        // Create MD5 hash of the lowercase trimmed email
        const hash = crypto
            .createHash('md5')
            .update(this.email.toLowerCase().trim())
            .digest('hex');
        
        // Set avatar URL with default options (size=200, rating=g, default=retro)
        this.avatar = `https://gravatar.com/avatar/${hash}?s=200&d=retro&r=g`;
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;