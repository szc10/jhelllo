app.res(`
<app id="component">
    <layout id="header_subpage">

 <header>
                <span class="category-left" data-action="back">
                    <icon class="ai-icon-back"></icon>
                </span>
                <span class="header-title">
                       {{=data}}
                </span>
            </header>

    </layout>
    <!-- header 没有图标的 -->
    <layout id="header_no_icon">
        <header>
            <span class="header-title">
             {{=data}}
         </span>
        </header>
    </layout>
</app>
`);
