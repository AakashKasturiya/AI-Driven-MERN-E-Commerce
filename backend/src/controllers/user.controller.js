import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const generateRandomPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export const createUser = async (req, res) => {
  try {
    const { name, email, role = "user", isBlocked = false, isVerified = false, password } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email and role are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password || generateRandomPassword(), 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isBlocked,
      isVerified,
    });

    return res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: users.length,
      users,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getUserById = async (req, res) => {

    try{

        const user = await User.findById(req.params.id)
        .select("-password");

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }

        return res.status(200).json({
            success:true,
            user
        });

    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}


export const updateUser = async (req, res) => {

    try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        ).select("-password");

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }

        return res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
        });

    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

export const deleteUser = async (req, res) => {

    try{

        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        });

    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}