<aura:application extends="force:slds">
    <aura:attribute name="columns" type="Integer" default="1" />
    <aura:attribute name="rows" type="List" default="[['Column 1']]" />
    <lightning:slider label="Columns" step="1" value="{!v.columns}" onchange="{! c.handleChange }"/>

    <div class="slds-scrollable_x">
        <aura:iteration items="{!v.rows}" var="row">
            <lightning:layout>
                <aura:iteration items="{!row}" var="col">
                    <lightning:layoutItem size="2">
                        {!col}
                    </lightning:layoutItem>
                </aura:iteration>
            </lightning:layout>
        </aura:iteration>
    </div>
</aura:application>