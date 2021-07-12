import { defineComponent } from "vue";

export default defineComponent({
    setup() {
       
    },
    render(){



        let optionList = [1,2,3,4]

        function renderOptionElement() {
            return optionList.map((optionItem)=> {
                return (
                    <option value={optionItem}>{optionItem}</option>
                )
            })
        }

        return (
            <select>
                {renderOptionElement()}
            </select>
        )
    }
})