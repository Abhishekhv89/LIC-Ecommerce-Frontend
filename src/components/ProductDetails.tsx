import React from 'react'
import { ParsedData } from '../interfaces/ParsedDataInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign,faHeart } from '@fortawesome/free-solid-svg-icons'
import Size from './Size'
import { Box, Button, SimpleGrid} from '@chakra-ui/react'
interface Props{
    product:ParsedData
    handleAddToCart:(product:ParsedData)=>void;
}

function ProductDetails({product,handleAddToCart}:Props) {

  // const handleAddToCart =()=>{

  // }
  
  return (
    <div className="productDetails">
         <h1>{product.name}</h1>
      <h5>Brand: {product.brand}</h5>
      <h6>Price: <FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"13px"}}/> {product.price}</h6>
      {/* <p>{product.description}</p> */}
      <img src={product.images[0]}  alt={product.name} /> 

      
      
      <div className="sizeContainer">
        {/* {Array.from({ length: 10 }).map((_, index) => (
        <Size size={`US${index}`}/>
      ))} */}
      <h5>select size:</h5>
  <SimpleGrid minChildWidth='90px' spacing='10px' margin={'10px 0px'}>
    
    {Array.from({ length: 17 }).map((_, index) => {
            
            const size = `US${(index/2) + 5.5}`; // Adjust size string based on your requirements
            const isDisabled = !product.sizes.includes(size);

            return (
              <Size 
                size={size} 
                disabled={isDisabled} 
                key={index}
              />
            );
          })}

</SimpleGrid>
      
      </div>

         <center>
             <div>
              <Button
                onClick={()=>{ 
                  // console.log(product);
                  handleAddToCart(product)}}
                size='lg'
                height='48px'
                width='450px'
                margin={'10px 0px 10px 0px'}
                // bgColor={'black'}
                colorScheme='teal'
              >
                Add to Cart
              </Button>
            </div>
              <div>
              <Button
                // onClick={() => loadMoreItems(currentPage)}
                size='lg'
                height='48px'
                width='450px'
                margin={'10px 0px 40px 0px'}
                colorScheme='gray'
              >
                Favourite  <FontAwesomeIcon icon={faHeart} style={{color: "#de1717",}}  className='mx-2' />
              </Button>
            </div>
            
            </center>  
             

      

      
      

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, laborum rerum incidunt eaque magni maiores enim a quam quod minus asperiores corrupti commodi error cupiditate eius minima esse ullam porro!
      Voluptate ea explicabo ullam optio animi sint rem ab sunt nobis saepe laudantium error atque ipsa doloremque dolor, assumenda inventore repellendus. Repellat provident necessitatibus pariatur minus nesciunt natus eius ratione?
      Minima ut consequuntur aliquam laboriosam nobis consequatur sequi eligendi necessitatibus consectetur, eveniet tempora corporis quis, delectus accusantium deleniti unde nulla quidem voluptatibus. Commodi labore pariatur magnam deserunt perspiciatis debitis vel.
      Cupiditate mollitia, itaque sapiente inventore in ducimus et consectetur alias nesciunt, quo hic culpa ab incidunt rem harum aperiam neque eaque, quas odit? Amet iure dolorum earum error corrupti? Cum!
      Aut consequatur magni recusandae perferendis ducimus ullam praesentium quae, necessitatibus nisi quas unde modi! Itaque excepturi quod accusamus nobis quas, iure dolore magni autem perspiciatis, esse, ullam odit dicta ea!
      Aspernatur aliquid recusandae, eveniet modi voluptate nulla, rerum expedita ipsam quod explicabo ad ducimus facilis adipisci alias veniam mollitia, illo quos numquam nemo. Vel esse deleniti, suscipit debitis itaque minus!
      Totam corporis exercitationem in quae molestias perspiciatis, soluta optio cupiditate iure, unde accusamus laudantium quisquam est impedit amet molestiae rerum at alias possimus placeat facilis sequi. Cumque, accusantium eos. Ratione!
      Id nam nesciunt laudantium explicabo perspiciatis numquam in commodi, maxime est ut iure facere distinctio aperiam. Distinctio iure earum beatae, voluptate inventore assumenda, amet doloribus, doloremque perspiciatis dignissimos deserunt maxime.
      Fugiat illo provident recusandae tempora tenetur aut cum facilis nam et ipsam rem quod, neque velit magnam, libero voluptatum, vel rerum inventore! Impedit quod nesciunt incidunt praesentium ullam alias. Similique?
      A exercitationem, commodi dolor consectetur velit tempore animi deserunt maiores pariatur magni. Nemo vel, a ipsam inventore dolor commodi reiciendis ratione sed hic ducimus animi deserunt? Sit at saepe voluptatem.
      Tempora praesentium accusamus facere assumenda quibusdam asperiores iusto soluta quia, nostrum quisquam iure sed quod enim corporis rem sequi perspiciatis ullam est, vel ex possimus, rerum quidem. Autem, nostrum aperiam.
      Alias numquam consequuntur hic quibusdam dicta sit, repellat pariatur a eaque repellendus quam enim laborum eos nulla placeat velit reiciendis doloremque soluta ducimus officia molestiae. Dolore consequuntur labore ab magni.
      Veritatis consequuntur porro quisquam repellendus architecto deserunt quis nostrum facere? Soluta harum tenetur nobis perspiciatis sint numquam odio nesciunt reprehenderit perferendis architecto. Modi quod autem cumque provident commodi sapiente error!
      Facere consectetur sapiente iusto enim fugit dolores! Magni voluptatem adipisci ratione vel maxime nisi quo alias aspernatur quisquam dolores quis totam quas blanditiis tenetur, laboriosam in facilis consequatur quaerat aperiam.
      Unde mollitia dolores aliquam magni, architecto similique placeat molestiae debitis! Unde iusto dolorum tenetur quia quis optio velit aperiam sapiente voluptatibus vel sunt, hic impedit assumenda mollitia expedita illum autem?
      Quo magni repellat nulla fuga voluptatum. Ex esse rem voluptatum explicabo ab consectetur cumque, quos natus magni corporis pariatur modi perferendis veniam doloremque, officia quasi. Fugiat dolor nesciunt eos quia.
      Consequatur sint harum blanditiis optio expedita cum unde, saepe est laborum esse accusamus aliquid omnis fugiat soluta aut quos libero natus eos ea atque? Delectus itaque quos quasi consequuntur ut!
      Suscipit sunt nihil, quisquam deleniti aliquam architecto cumque. Distinctio optio voluptates similique, eaque repellendus cumque nulla! Maiores laborum, nihil tempore maxime harum quas aliquam ratione quae, quo excepturi nesciunt placeat.
      Eos, ut tenetur dolorum maiores nostrum aliquid praesentium earum impedit, non labore inventore unde nam tempora quis vero ipsam, dolore atque maxime deserunt aperiam? Accusamus explicabo dolorum odit iure incidunt?
      Consequatur debitis voluptates esse aliquam dolor voluptatum deleniti tempora magni corporis ullam excepturi odio, qui eos eligendi aperiam dicta quis. Consequuntur, delectus eos explicabo asperiores natus quas fugit libero necessitatibus.
      Ut, quia ipsa esse consequatur eius laboriosam accusamus nihil cum odio, voluptates aperiam fugiat, cumque rerum perspiciatis asperiores quasi dolore distinctio sint labore culpa dicta omnis officiis nobis quibusdam. Quibusdam.
      Tempore iusto vel dolorem maiores, nam necessitatibus quos delectus! Saepe dolor ut facilis eum quidem culpa sapiente suscipit aliquam nisi, minima esse maiores ipsa ad tempore ab qui, dolorum maxime.
      Illum dolore molestiae commodi dolorem magni at nisi repellendus dicta necessitatibus ab illo, laboriosam facere soluta neque possimus rerum incidunt iste accusantium earum amet. Eum quo est earum doloremque sapiente?
      Ut tenetur perferendis corporis cupiditate eligendi libero repudiandae explicabo, fuga ipsum accusantium. Ipsa saepe, minima laborum, ullam, aperiam laudantium facilis blanditiis perspiciatis nobis porro aliquam rem aut voluptatem autem. Quos.
      Suscipit odit enim porro aperiam aliquam dignissimos nostrum, id modi iure et accusantium hic molestiae. Eaque incidunt autem ipsam cupiditate maxime. Recusandae aliquam voluptatum reiciendis reprehenderit soluta? Officia, quisquam aliquid?
      Quos architecto ipsa vel fugit magni sit, dolorum facere, possimus suscipit mollitia dolores commodi voluptatum, sint necessitatibus magnam numquam incidunt illum blanditiis distinctio voluptas a eius ullam! Cupiditate, illum dolores?
      Quisquam mollitia dignissimos doloribus dolorem maiores in eius fugiat expedita sit omnis, minus, placeat necessitatibus est eligendi cupiditate obcaecati eos officia quam laudantium perferendis. Nulla quidem autem voluptatum nostrum aliquam.
      Doloremque ad voluptatum minus praesentium exercitationem dolorem. Ad molestiae commodi quaerat repudiandae distinctio! Cumque deserunt, repellat tempora ab sed quo vitae ad nemo nesciunt aperiam eveniet veritatis maxime pariatur magnam!
      Amet eligendi ullam, tenetur ex cum inventore repellat! Molestiae illum magni, quaerat ducimus fuga perferendis est eveniet facilis autem consequuntur? Ducimus ut ad nisi, eum possimus fuga totam facilis tenetur.
      Similique, rem quos delectus, aliquid ex unde molestiae possimus quas ea animi tempora numquam! Eius nam non, laborum mollitia eum libero ipsum iusto, sequi, quam iste nobis quibusdam possimus ad.
      Eaque labore voluptatem minus! Autem cumque voluptates aut aspernatur debitis optio error temporibus, consequatur, dolorum facere reprehenderit qui non tempore. Facilis obcaecati aut repellendus consequatur nam maiores laborum libero a.
      Earum perspiciatis aliquid, quas corrupti ratione cum necessitatibus ad assumenda porro eum? Voluptas, distinctio quaerat. Maiores consequuntur omnis deleniti fuga, velit cum qui amet nisi consectetur perspiciatis tenetur quaerat placeat!
      Ullam deserunt sunt atque nulla voluptas dolores ducimus iste cupiditate beatae provident, voluptatum iusto quae distinctio officiis impedit unde inventore nemo odio accusantium repudiandae tenetur quo mollitia earum! Perferendis, aliquid!
      Rem laudantium sit excepturi, nobis ab eum fugiat dicta natus tempore consectetur recusandae odit cupiditate dolores mollitia. Iure libero repellendus dignissimos harum molestias dolorum deserunt ea ipsum ut. Sed, dolorum!
      Cum, id eligendi! Temporibus qui esse doloremque, laborum asperiores consectetur aliquam cum placeat dolores quod vero reprehenderit voluptatem corrupti non corporis expedita? Explicabo, impedit. Dolore ex commodi soluta vitae sint?
      Praesentium, quod porro. Odio aliquid consequatur aliquam ex iusto nostrum hic quo doloremque, pariatur, ipsam veritatis eaque quas possimus, alias architecto rem illum voluptatibus minima fuga obcaecati adipisci provident! Consequatur!
      Earum in provident accusamus odio facilis consequuntur, explicabo ipsum odit aspernatur vitae soluta quae debitis temporibus consequatur consectetur praesentium voluptatibus. Hic reprehenderit, sit sint praesentium a fuga nam! Dolorem, quas.
      Tempora, et vel explicabo quaerat facilis ea impedit. Eveniet reprehenderit, repellat soluta saepe necessitatibus eius quis ex non totam optio iste corrupti provident harum. Odio numquam voluptates vel nulla a.
      Maiores a ducimus quae nesciunt nobis iste obcaecati harum cumque blanditiis consectetur dolorum voluptates eveniet molestiae quos quaerat officia quibusdam earum sunt, molestias, optio accusantium sed fuga deserunt? Et, voluptatum.
      Neque autem ipsum aspernatur ducimus commodi nam iusto, magni delectus fuga sit nihil exercitationem. Et expedita est dicta possimus impedit modi quo eos illo labore, nemo fugiat saepe provident vero.
      Totam optio placeat ipsum autem natus quo libero earum doloribus, quisquam architecto necessitatibus sunt laudantium fugiat molestiae distinctio, delectus recusandae consequuntur, incidunt nulla corporis iusto repudiandae. Expedita impedit rerum nostrum.
      Doloremque nam nobis rem provident accusantium? Suscipit vel eos amet optio blanditiis sit. Dolores magnam facilis, a ipsa vero minus nobis adipisci, in distinctio fugit, quibusdam corrupti provident excepturi dolorem!
      Nobis, culpa officiis facere atque error minus odio asperiores maiores distinctio sed! Itaque neque dignissimos incidunt, omnis a repellat iure dicta cum. Animi vitae commodi dignissimos quo saepe dolore nostrum?
      Suscipit animi dolores quam ipsa in at repellat alias nostrum labore repudiandae, ducimus, architecto magnam voluptate debitis sequi perspiciatis facere. Nihil veritatis natus explicabo voluptatem sit voluptates id illo in!
      Mollitia cum tempore quasi rem sunt est velit voluptas fugiat ducimus qui! Quisquam placeat optio unde quod tempora quidem delectus dolore sunt, minima dolor rem omnis ratione corporis nulla deleniti.
      Obcaecati corrupti voluptates laudantium optio nemo reiciendis totam. Illo voluptatum commodi suscipit molestias unde reprehenderit exercitationem aliquid porro, excepturi dicta laudantium! Iste, velit! Illo obcaecati fugit ratione exercitationem pariatur tempora.
      Laboriosam ipsa id quas atque, consequatur cumque iure dolor earum ratione illum architecto sequi modi quidem reprehenderit eos alias? Ullam aliquam iure debitis praesentium! Hic exercitationem ipsum atque itaque facere!
      Facilis nisi, culpa nobis fuga distinctio ea in maxime, numquam repudiandae eos sed non fugiat nemo, quos voluptatem iure quas? Ipsam facere repudiandae sequi molestiae id eius, quidem iure sit!
      Enim quo ipsa laborum officia, exercitationem maxime saepe temporibus ea, voluptatum minima rerum, nulla praesentium. Accusantium reprehenderit maxime ipsa voluptates provident, maiores accusamus molestias omnis suscipit, illo debitis? Nesciunt, voluptatibus.
      Cupiditate debitis modi corrupti nobis in consequatur id tempore unde nisi reprehenderit enim cumque, molestiae eaque natus magnam dicta mollitia similique? Optio illum quis totam sunt fugiat ea praesentium? Sapiente?
      Labore ullam sunt ab sit saepe, illum similique alias vitae autem, atque repudiandae, asperiores enim aliquam aut sequi molestias nam. Enim, totam quibusdam. Eligendi nihil repellendus cupiditate iste numquam odit.
      Nesciunt nemo iste non, praesentium sint quos quia laborum iure reiciendis ipsam fuga odio soluta. Sed omnis animi perferendis, molestias, quae laborum facilis quasi minima veritatis quaerat porro totam tempora.
      Ab at tempora eum, ad odio itaque, iste nobis quia qui vitae aperiam eius optio porro impedit, sequi sed incidunt ullam. At mollitia, asperiores ex earum voluptates debitis beatae voluptate.
      Enim consectetur quo omnis, tenetur nostrum nobis excepturi ut! Rerum nulla quas beatae temporibus officiis sequi corporis consequuntur accusamus. Fuga ullam illum aut expedita vitae quaerat ducimus maiores nemo eaque!
      A, facere, error ipsam fuga magni quos veritatis eveniet rem neque harum alias iusto sint quo impedit facilis laborum, et laboriosam. Tenetur nam, id necessitatibus ex magni enim eligendi sint!
      Voluptates cumque dolores possimus sequi ratione ea qui dicta voluptate rem deleniti, vitae consectetur accusamus architecto quisquam aliquid enim nulla ducimus illo voluptas laborum. Aspernatur rerum inventore consequuntur voluptates architecto.
      Dolorem officiis dolor voluptatibus necessitatibus non? Ipsum accusamus, non porro amet repellat atque beatae quibusdam quas rem explicabo. Maxime tempora deserunt vel eius. Id nemo illum hic ducimus iure placeat.
      Culpa, inventore amet. Voluptas, quo facere odit nostrum nulla impedit quos voluptates amet error laboriosam rem, cum est? Magnam distinctio totam, ab odit exercitationem doloremque similique sed necessitatibus obcaecati omnis!
      Fugit sint quos laborum labore quidem vel blanditiis saepe dicta necessitatibus natus id ea impedit in dolorem incidunt dolor cupiditate illum quo debitis, quasi ab nulla deleniti. Praesentium, ea dignissimos!
      Delectus et nam molestias totam minima voluptatibus, placeat adipisci odio soluta tenetur quas recusandae, ducimus veritatis dolorum dicta. Vel reprehenderit recusandae accusantium minima voluptatem fuga nisi mollitia quis pariatur maiores?
      Molestiae, iusto! Ipsa reprehenderit et fuga? Eius, id? Quod voluptatem vel officiis, alias ab amet officia assumenda, nobis quo aliquam mollitia odio? Rem tempore quae, dolore explicabo minus placeat a?
      Dignissimos ipsa minima vel nam enim culpa sequi, quaerat consectetur corrupti adipisci quo fugit, quisquam alias velit magni pariatur odit in ullam, vitae cupiditate accusantium? Earum, consequatur. Debitis, eos delectus.
      Obcaecati similique pariatur explicabo, incidunt autem odio magnam tenetur eius saepe minus non eligendi sequi est repellat, praesentium perspiciatis natus vitae in aut. Sit quos debitis molestiae explicabo iste necessitatibus.
      Ipsam, molestias, error veritatis officia, quod cum beatae laborum esse placeat vero dolorem voluptatum enim quibusdam totam rerum accusamus repellendus natus cupiditate iure numquam? Quas laboriosam excepturi illum repudiandae? Rerum.
      Delectus, excepturi commodi. At incidunt, corporis quibusdam, quisquam quos ducimus corrupti harum minus eaque officia consequuntur debitis ipsum atque accusamus id deserunt. Eligendi, enim? Maxime minima voluptate numquam porro dolores!
      Illum beatae quasi quo nemo laudantium magnam, earum velit, alias et obcaecati delectus iure impedit eligendi. Neque reprehenderit rerum, quod eligendi eos quae temporibus natus ut ducimus sint eum pariatur!
      Ducimus quos fugit accusamus aperiam culpa natus, soluta est molestiae vitae sint enim laborum, corporis illo nihil alias fugiat aliquam nemo mollitia cupiditate exercitationem corrupti modi! Tempore voluptates exercitationem nam.
      Explicabo consequatur repellendus saepe, suscipit provident laboriosam, perferendis quia assumenda sint qui maiores itaque ea odit libero delectus repellat iste exercitationem molestias deleniti laudantium dolor accusantium temporibus obcaecati. Laborum, voluptate.
      Vel commodi dolores sequi voluptatem. Veritatis architecto quo ea quis accusantium itaque id doloribus quisquam. Ut veniam sunt nulla debitis doloremque, et praesentium, minima dicta ipsam expedita dignissimos nisi reprehenderit?
      Pariatur dicta culpa aut, labore dolore molestias ullam distinctio fugiat rem quaerat veniam. Ea aperiam labore officia ratione similique, iusto molestiae libero facilis, in ipsam corrupti voluptates, architecto mollitia harum?
      Cupiditate iste blanditiis repellendus explicabo odit repudiandae temporibus, amet minus corrupti eveniet commodi placeat quidem vero. Aliquam, assumenda quibusdam, minima veritatis harum sit, sed possimus aut unde id obcaecati reprehenderit.
      Ipsum culpa corporis magnam dolorum libero, porro aliquam nobis aperiam quisquam maiores numquam minima. Quis nemo mollitia quo tempora doloremque quam quod culpa quaerat veniam, ipsam earum in, deserunt sunt?
      Laborum et, soluta magnam numquam sequi accusantium iusto veniam suscipit hic laudantium similique unde distinctio, necessitatibus, in quidem quas! Molestiae mollitia id, magni fuga nam fugit perspiciatis totam sapiente ipsa!
      Dolorem adipisci, asperiores magnam voluptatum reprehenderit eum rerum est earum repellendus. Blanditiis sint optio consequuntur corporis ad. Explicabo maxime possimus hic blanditiis suscipit neque dignissimos doloremque similique nobis ipsum? Assumenda.
      Et, cumque! Velit sunt pariatur earum error dolorum nostrum rem asperiores nam ratione, quisquam, cum officiis minima totam? Et, nihil ab quasi suscipit quaerat corporis laboriosam harum sed facere totam.
      Ratione, quo. Quo soluta esse nisi consequatur tempora mollitia minima, doloremque neque aspernatur! Inventore illo velit, praesentium quia incidunt excepturi sequi ullam nisi quod reiciendis modi asperiores consectetur fugit accusamus?
      Esse officiis modi, unde voluptas cum asperiores perspiciatis. Odit aperiam ipsam iusto suscipit, similique enim illum rerum unde quod repellendus asperiores minima expedita saepe, praesentium voluptatum recusandae commodi, cupiditate nemo!
      Molestias cum, inventore ad autem, eligendi consectetur sapiente recusandae asperiores vero assumenda, ipsam excepturi. Iure praesentium nostrum quibusdam repellendus velit enim sequi autem! Qui dolore soluta minus ipsam officiis corporis.
      Voluptatibus dolore inventore eos illo iusto pariatur adipisci, laudantium fuga quae sint sed distinctio, tempore minima dolor facilis. Tempora exercitationem eos ea odio commodi obcaecati libero quam nihil, quisquam dolorem?
      Quam aliquam molestias accusamus recusandae eos explicabo consectetur perferendis sequi, consequatur sit alias nobis, enim aut similique cum blanditiis eaque, pariatur quae magnam earum laborum labore facere. Explicabo, velit nisi.
      Odio porro vero aliquam at, assumenda officiis voluptas magnam. Illum nam praesentium veniam. Non delectus ipsum rerum dolor saepe ipsa, excepturi doloremque odio. Veniam, dolore! Rem, aperiam. Obcaecati, eaque inventore.
      Quidem saepe quia nisi adipisci voluptates ratione? Harum voluptates quisquam non alias dolor deserunt maxime est, adipisci voluptas a cum ullam consequuntur! Possimus placeat consequatur quaerat voluptate, dicta voluptates sequi.
      Nobis quos dolorum corporis atque, provident, saepe aut quasi consectetur commodi corrupti repellat reiciendis laudantium quidem at quo quas! Minima tempora facere reiciendis! Illum tenetur necessitatibus hic ab sed perferendis?
      Voluptatem obcaecati provident animi perferendis inventore minus? Autem, expedita architecto reiciendis nihil fugiat vero doloribus iure delectus? Quia obcaecati dicta accusamus blanditiis suscipit. Dolores esse non necessitatibus corrupti, sint praesentium!
      Illum eos officiis sed repellendus voluptatum, suscipit debitis! Necessitatibus ipsam, dolore voluptas consequuntur atque vitae architecto mollitia aperiam provident harum laborum quisquam nostrum! A, iusto ut obcaecati minus fuga facere?
      Iusto voluptatum labore eaque voluptatem error? Culpa cum numquam blanditiis, eum labore sapiente laudantium ea natus ratione? Deleniti, quia tenetur explicabo, non, accusantium facere minus maiores id exercitationem autem fuga!
      Ipsa nihil cumque suscipit illum ducimus vitae temporibus ullam, ab itaque ratione tempora? Dolor, aperiam provident dignissimos laudantium quos voluptate esse sint autem quae nihil, veritatis error nulla atque! Quia!
      Cum quo nesciunt hic quas ipsam, id tempora, praesentium amet porro nihil harum, assumenda est omnis velit? Sed iure, similique id expedita, dignissimos dolorem molestiae adipisci repellendus, aliquid dicta nihil.
      Praesentium officiis veniam corporis iste eos itaque, magnam reprehenderit repudiandae doloribus eveniet temporibus mollitia iusto harum laboriosam voluptatem cum ullam similique ipsum? Libero natus commodi accusamus quaerat autem omnis provident.
      Commodi accusantium ipsum temporibus. Optio tenetur fugiat architecto amet consectetur, tempora quaerat impedit quae magnam suscipit sapiente quisquam nemo beatae at cupiditate laudantium ipsa qui dolore eius omnis voluptatem ipsam.
      Accusamus harum veniam obcaecati libero voluptas quo, quis natus quia dicta fugiat nisi cum labore vel, laboriosam, velit voluptatibus id deserunt iure aliquam impedit. Quisquam ex quibusdam cumque impedit minima.
      Incidunt aspernatur dolorem voluptatum maiores nesciunt totam reiciendis beatae cupiditate officiis! Perferendis, sequi reprehenderit eaque iure excepturi debitis error est eos, ad omnis optio beatae laborum officia obcaecati facere minus!
      Quaerat, natus dicta soluta repudiandae ad qui? Non aliquam id ipsa dolore ratione deserunt eos et neque quo consequuntur! Impedit illo ad ipsum dolores sunt rem optio. Dolor, enim quis.
      Quam animi officiis incidunt dignissimos. Natus sint minus commodi nisi nobis quod dolore atque harum at ipsa, excepturi asperiores consequuntur nihil corrupti ipsum consequatur illo? Nemo maxime cupiditate fugiat voluptatibus.
      Quos tempore assumenda veritatis hic a odio maxime, non repellendus consectetur corrupti. At quibusdam adipisci dignissimos magnam cum, eaque libero et nobis nisi impedit tempora tenetur eum autem, dolorum sint.
      Ut rerum incidunt assumenda voluptate fugit quia minus quo totam harum vel ipsam labore commodi, ipsa laudantium qui, ducimus obcaecati, odit deleniti soluta. Magni nemo unde nesciunt nobis ea eaque?
      Exercitationem, obcaecati pariatur! Saepe dolore voluptas, ipsa tempore temporibus ut porro modi blanditiis cupiditate, ipsam officia id rem doloremque neque molestiae libero ad incidunt earum quis laboriosam dolorum! Eveniet, quia.
      Distinctio minima asperiores veritatis quo sequi provident, recusandae iure nisi soluta error similique at odio earum minus, ipsa ut dolorum perspiciatis ratione optio nihil alias sapiente aut fugiat numquam. Aspernatur!
      Aliquam tempora magni vero. Veritatis, odio id est quam numquam doloremque molestiae fuga commodi quis cupiditate ex, sapiente non deserunt. Odit obcaecati fugit assumenda ab incidunt porro doloremque cumque non.
      Modi quos aspernatur temporibus minima dolor cumque et, soluta voluptatem atque architecto, quis consequuntur impedit amet provident, molestias molestiae repellat illum doloribus! Perferendis mollitia modi ipsa reprehenderit, necessitatibus quasi sequi.</p>
    </div>
  )
}

export default ProductDetails
