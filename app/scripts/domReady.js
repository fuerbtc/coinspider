define(['jquery','chosen','bootstrap'], function($){

    function ready($){
        $(document).ready(function(){

            $('.minimize-box').on('click', function (e) {
                $(this).children('i').each(function(){
                    $this = $(this);
                    a = this;
                    if ($this.hasClass('fa-chevron-down')) {
                        $this.removeClass('fa-chevron-down').addClass('fa-chevron-up');
                    } else if ($this.hasClass('fa-chevron-up')) {
                        $this.removeClass('fa-chevron-up').addClass('fa-chevron-down');
                    }
                });
            });


            /*-- Chosen --*/
            $(".ch-select").chosen();
            $(".ch-select-deselect").chosen({
                allow_single_deselect: true
            });
            /*-- End Chose --*/
        });

    }

    return {
        ready:ready
    }
});