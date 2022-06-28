import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userDetails.js';

export const signin = async (req,res) => {
  const { username, password } = req.body;
  try{
    const existingUser = await User.findOne({ username });

    if (!existingUser) 
      return res.status(404).json({ message: 'User does not exist.' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });
  
    const token = jwt.sign({ username: existingUser.username, id: existingUser._id },'mysecretprivatekey');

    res.status(200).cookie("authCookie", token, { httpOnly: true, expiresIn: '1d'}).send(existingUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong.'});
  }
}

export const signup = async (req, res) => {
  const { username, password, profilePicture } = req.body;
  try{
    const existingUser = await User.findOne({ username });

    if (existingUser) 
      return res.status(404).json({ message: 'User already exist.' });
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({username, password: hashedPassword, profilePicture });
    
    const token = jwt.sign({ username: result.username, id: result._id },'mysecretprivatekey');

    res.status(200).cookie("authCookie", token, { httpOnly: true }).send(result);
  } catch (error){
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong.'});
  }
}

export const signout = async (req, res) => {
  try{
    res.clearCookie("authCookie").send({message: 'Success'});
  } catch(error){
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong.'});
  }
}

//To be removed
export const getUsers = async (req, res) => {
  try{
    const users = await User.find();
    
    res.status(200).json(users);
  }catch(error){
    res.status(404).json({message: error.message });
  }
}

export const getUser = async (req, res) => {
  if (!req.userId) return res.json({ message: 'Unauthenticated!'});

  try{
    const user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (error){
    res.status(404).json({ message: error.message });
  }
}

export const getUserByUsername = async(req, res) => {
  const { username } = req.params;

  try{
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: 'User does not exist.' });

    let userEdited = {
      username: user.username,
      profilePicture: user.profilePicture,
      dateCreated: user.dateCreated
    }
    
    res.status(200).json(userEdited);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}