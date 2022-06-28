import { 
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea, 
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const Form = ({formData, setFormData, onSubmit, type, btnName}) => {
  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={'1em'} my={'0.5em'}>
      {(type === 'createpost') && (
        <>
        <FormControl>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input id='title' placeholder='Enter title' onChange={(e) => {
            console.log(formData.title)
            setFormData({...formData, title: e.target.value})}} />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='tags'>Tags (seperated by comma ',')</FormLabel>
          <Input id='tags' placeholder='Enter tags seperated by comma' onChange={(e) => {setFormData({...formData, tags: e.target.value.split(',')})}}/>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        </>
      )}
      {(type === 'updatepost') && (
        <>
        <FormControl>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input id='title' placeholder='Enter title' defaultValue={formData.title} onChange={(e) => {setFormData({...formData, title: e.target.value})}} />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='tags'>Tags (seperated by comma ',')</FormLabel>
          <Input id='tags' placeholder='Enter tags seperated by comma' defaultValue={formData.tags !== undefined && formData.tags.join(',')} onChange={(e) => {setFormData({...formData, tags: e.target.value.split(',')})}}/>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
            <FormLabel htmlFor='message'>Message</FormLabel>
            <Textarea id='message' placeholder='Enter message' 
              defaultValue={formData.message} 
              onChange={(e) => {setFormData({...formData, message: e.target.value})}}/>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </>
      )}
      {(type === 'signup' || type === 'login') && (
        <>
          <FormControl>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input id='username' placeholder='Enter username' onChange={(e) => {setFormData({...formData, username: e.target.value})}} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input id='password' type='password' placeholder='Enter password' onChange={(e) => {setFormData({...formData, password: e.target.value})}} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </>
      )}
       {type === 'signup' && (
        <FormControl>
          <FormLabel htmlFor='cfmPassword'>Confirm Password</FormLabel>
          <Input id='cfmPassword' type='password' placeholder='Enter the same password' onChange={(e) => {setFormData({...formData, cfmPassword: e.target.value})}} />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
       )}
        {(type === 'createpost' || type === 'comment') && (
          <FormControl>
            <FormLabel htmlFor='message'>Message</FormLabel>
            <Textarea id='message' placeholder='Enter message' 
              onChange={(e) => {setFormData({...formData, message: e.target.value})}}/>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        )}
        <Button type={'submit'} colorScheme={'blue'}>{btnName}</Button>
      </VStack>
    </form>
  )
}

export default Form