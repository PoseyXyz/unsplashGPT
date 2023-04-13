import Image from 'next/image'
import unsplash from '../lib/unsplash'
import { ChangeEvent, useEffect, useState } from 'react'
import { GMB_KEYS } from '../data/supported-gmb-keys'
import { Configuration, OpenAIApi } from 'openai'
import { IoIosClose } from 'react-icons/io'
import { FaSearch } from 'react-icons/fa'



export default function Home() {

  const [keyArray] = useState(GMB_KEYS)
  const [selectedKey, setSelectedKey] = useState('')


  const [tempItemArray, setTempItemArray] = useState(keyArray)
  const [searchString, setSearchString] = useState<string>('')

  



  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchString(e.target.value)
  }

  const searchList = () => {
    setTempItemArray(keyArray.filter(items => items.toLowerCase().match(searchString.toLowerCase())))
  }

  const saveCategorySelection = (selectedOption: string) => {
    setSelectedKey(selectedOption)
  }

  useEffect(() => {
    searchList()
  }, [searchString])

  //  useEffect(()=>{    
  //   unsplash.search
  //   .getPhotos({query:'dogs', perPage:10, page:1})
  //   .then((result)=>console.log(result.response?.results))
  //   .catch((error)=>console.log(error))
  // }, [])

 

  // useEffect(() => {
  //   function airequestsender() {

  //     const configuration = new Configuration({
  //       organization: "org-yl3HActUjHpuNqtN5N4uoGRU",
  //       apiKey: "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",
  //     });
  //     const openai = new OpenAIApi(configuration);

  //     async function runCompletion() {

  //       let tempObject = ''
  //       try {

  //         const completion = await openai.createChatCompletion({
  //           model: "gpt-3.5-turbo",
  //           messages: [
  //             { role: "user", content: `Suggest 10 search query texts for the Unsplash API to find images for the "header" section of a barber shop website. Return the search queries in a JSON array.` },
  //           ],
  //           max_tokens: 4000,
  //           temperature: 1.1
  //         });
  //         tempObject = completion.data.choices[0].message.content

  //       } catch (error) {
  //         console.log(error);
  //       }

  //       console.log(typeof(JSON.parse(tempObject)));
  //       return tempObject
  //     }
  //     runCompletion()
  //   }

  //   airequestsender()


  // }, [])
 
  return (
    <main className="grid grid-cols-3 min-h-screen">
      {/* <select className='bg-red-500' value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)} name="" id="">
        {keyArray.map(key => (
          <option value={key} key={key}>{key}</option>
        ))}
      </select> */}

      <section className='col-span-1 flex flex-col gap-12 py-24 px-8'>

        <div className="flex flex-col gap-6">
          <label htmlFor="Company name" className="text-xl">
            GMB Key
          </label>

          <div className='flex'>
            <article className='relative w-[85%]'>

              <div className={`${searchString === '' ? 'border border-r-0' : 'border border-b-0'} border-gray-400 flex gap-4`}>
                {/* <h1 className="text-xl">{searchString}</h1>
            <div className="grid grid-cols-3">
                {tempItemArray.map((item, index) => {
                    return (z
                        <p key={index} className="text-xl">{item}</p>
                    )
                })}
            </div> */}
                {
                  selectedKey === '' ? <input value={searchString} onChange={(e) => { onFormChange(e) }} className={`flex-auto hover:bg-gray-100 p-4 border-0 outline-none text-black`} placeholder='E.g. "Sushi restaurant" or "Hairdresser"' />
                    :
                    <button onClick={() => setSelectedKey('')} className="bg-[#EAEAEA] m-3 border-2 border-[#69AF24] py-3 px-5 flex justify-between min-w-[23%] items-center">{selectedKey} <i className="text-xl"><IoIosClose /></i></button>
                }
                {/* <div className="self-center px-4 flex-auto bg-gray-200 rounded-2xl">{selected}</div>  */}

              </div>
              <div className="overflow-scroll max-h-[20vh] absolute w-full"> {
                searchString === '' ? null :
                  <div className="flex flex-col gap-1 items-start border-gray-400 border w-full border-t-0">

                    {tempItemArray.map((item: string, index: number) => {
                      return (
                        <button onClick={() => { saveCategorySelection(item); setSearchString('') }} className="w-full" key={index}><li className="py-2 list-none block px-4 w-full text-left hover:bg-[#EBF5FF] hover:text-[#0078c8]">{item}</li></button>
                      )
                    })}
                  </div>
              }
              </div>
            </article>


            <button className='bg-[#D9D9D9] p-4 text-xl cursor-pointer'><FaSearch /></button>

          </div>


        </div>

        <hr className='w-full' />

        <div className='flex gap-6 flex-col'>

          <h3 className='text-xl'>GPT Suggested Keywords</h3>

          <div className='flex flex-wrap gap-4'>
              <a href="https://unsplash.com">Sample link</a>
              <a href="">Sample link</a>
              <a href="">Sample link</a>
              <a href="">Sample link</a>
              <a href="">Sample link</a>
              <a href="">Sample link</a>
              <a href="">Sample link</a>
          </div>
        </div>

      </section>

      <section className='col col-span-2 bg-gray-400'>

      </section>

    </main>
  )
}